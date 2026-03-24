"use server"
import { createClient } from "./supabase/client"


//import { supabaseClientSide } from './supabase/client'
// loading plane snapshot from supabase

const supabase = await createClient()
const { data: flightsData, error: flightsError } = await supabase
  .from('flights')
  .select('*')
const { data: planesData, error: planesError } = await supabase
  .from('planes')
  .select('*')
const { data: destinationsData, error: destinationsError } = await supabase
  .from('destinations')
  .select('*')
  
// creating plane lookup table
const planeLookup: { [plane_id: number]: {
    plane_id: number,
    plane_name: string,
    total_seats: number
} } = {}
planesData?.forEach((plane: any) => {
  planeLookup[plane.plane_id] = plane
})

// creating flight lookup table
const flightLookup: { [destination_id: number]: {
    flight_id: number,
    plane_id: number,
    destination_id: number,
    reserved_seats: number,
    departureDate: Date, // actual date of departure
    departsIn: number,  // number of days before departure
    origin_id: number,
    cost: number,
} } = {}
flightsData?.forEach((flight: any) => {
    const departDate = new Date(flight.departure_time)
    const diffInDays = Math.floor(
        (+departDate - +new Date()) / (1000 * 60 * 60 * 24)
    );
    flightLookup[flight.flight_id] = {
        flight_id: flight.flight_id,
        plane_id: flight.plane_id,
        destination_id: flight.destination_id,
        origin_id: flight.origin_id,
        reserved_seats: flight.reserved_seats,
        departureDate: departDate,
        departsIn: diffInDays,
        cost: flight.cost,
    }
})

// creating destinations lookup table
const destinationLookup: { [destination_id: number]: {
    destination_id: number,
    name: string,
    country: string,
    city: string,
    airport_code: string,
} } = {}
destinationsData?.forEach((destination: any) => {
  destinationLookup[destination.destination_id] = destination
})

// returns a snapshot of the current plane data
async function getPlaneData(plane_id: number) {
    return structuredClone(planeLookup[plane_id]);
}
async function getFlightData(flight_id: number) {
    return structuredClone(flightLookup[flight_id]);
}
async function getDestinationData(destination_id: number) {
    return structuredClone(destinationLookup[destination_id])
}

export type flightFilter = {
    destination: string | null,
    cost: [number, number] | null,
    departure: [number, number] | null,
    seats: [number, number] | null,

    entries: [number, number] | null,
    sortBy: "Departure" | "Seats" | "Cost" | null,
    sortAscending: boolean | null,
}
export type flightFilterResult = {
    destination: string,
    origin: string,
    seats: number,
    departsIn: number,
    departureFormattedDate: string,
    planeName: string,
    cost: number,
    flightId: number,
}
async function getFilteredFlightData(
  flightFilter: flightFilter
): Promise<flightFilterResult[]> {
  let filteredFlights = Object.values(flightLookup);

  // -------------------------
  // Filter by destination name
  // -------------------------
  if (flightFilter.destination) {
    const flightsWithDestinations = await Promise.all(
      filteredFlights.map(async (flight) => {
        const destination = await getDestinationData(flight.destination_id);
        const destinationStr = `${destination.city}, ${destination.country}`;
        return {
          flight,
          matches: destinationStr
            .toLowerCase()
            .includes(flightFilter.destination!.toLowerCase()),
          destinationStr,
        };
      })
    );

    filteredFlights = flightsWithDestinations
      .filter((item) => item.matches)
      .map((item) => ({ ...item.flight, destinationStr: item.destinationStr }));
  }

  // -------------------------
  // Filter by cost range
  // -------------------------
  if (flightFilter.cost) {
    const [minCost, maxCost] = flightFilter.cost;
    filteredFlights = filteredFlights.filter(
      (flight) => flight.cost >= minCost && flight.cost <= maxCost
    );
  }

  // -------------------------
  // Filter by departure range
  // -------------------------
  if (flightFilter.departure) {
    const [start, end] = flightFilter.departure;
    filteredFlights = filteredFlights.filter(
      (flight) => flight.departsIn >= start && flight.departsIn <= end
    );
  }

  // -------------------------
  // Filter by seats available
  // -------------------------
  if (flightFilter.seats) {
    const [minSeats, maxSeats] = flightFilter.seats;
    const flightsWithSeats = await Promise.all(
      filteredFlights.map(async (flight) => {
        const plane = await getPlaneData(flight.plane_id);

        const availableSeats = plane.total_seats - flight.reserved_seats;
        return {
          flight,
          matches: availableSeats >= minSeats && availableSeats <= maxSeats,
          availableSeats,
        };
      })
    );

    filteredFlights = flightsWithSeats
      .filter((item) => item.matches)
      .map((item) => ({ ...item.flight, availableSeats: item.availableSeats }));
  }

  // -------------------------
  // Sort by requested field
  // -------------------------
  if (flightFilter.sortBy) {
    const ascending = flightFilter.sortAscending ?? true;

    // Preload planes if sorting by seats
    let planeCache: Record<string, { total_seats: number }> = {};

    if (flightFilter.sortBy === "Seats") {
      await Promise.all(
        filteredFlights.map(async (flight) => {
          if (!planeCache[flight.plane_id]) {
            planeCache[flight.plane_id] = await getPlaneData(flight.plane_id);
          }
        })
      );
    }

    filteredFlights.sort((a, b) => {
      let compare = 0;

      if (flightFilter.sortBy === "Departure") {
        compare = a.departsIn - b.departsIn;
      } else if (flightFilter.sortBy === "Seats") {
        const seatsA =
          planeCache[a.plane_id].total_seats - a.reserved_seats;
        const seatsB =
          planeCache[b.plane_id].total_seats - b.reserved_seats;
        compare = seatsA - seatsB;
      } else if (flightFilter.sortBy === "Cost") {
        compare = a.cost - b.cost;
      }

      return ascending ? compare : -compare;
    });
  }

  // -------------------------
  // Limit entries
  // -------------------------
  if (flightFilter.entries) {
    filteredFlights = filteredFlights.slice(
      flightFilter.entries[0],
      flightFilter.entries[1]
    );
  }

  // -------------------------
  // Map data to bookings
  // -------------------------
  const bookings: flightFilterResult[] = await Promise.all(
    filteredFlights.map(async (flight) => {
      const plane = await getPlaneData(flight.plane_id);
      const destination = await getDestinationData(flight.destination_id);
      const destinationStr = `${destination.city}, ${destination.country}`
      const origin = await getDestinationData(flight.origin_id);
      const originStr = `${origin.city}, ${origin.country}`
      const availableSeats = plane.total_seats - flight.reserved_seats;

      return {
        destination: destinationStr,
        origin: originStr,
        seats: availableSeats,
        departsIn: flight.departsIn,
        departureFormattedDate: flight.departureDate.toLocaleString(),
        planeName: plane.plane_name,
        cost: flight.cost,
        flightId: flight.flight_id,
      };
    })
  );

  return bookings;
}

export {getPlaneData, getFlightData, getDestinationData, getFilteredFlightData}