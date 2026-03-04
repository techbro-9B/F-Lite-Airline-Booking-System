"use server"
import { createClient } from '@supabase/supabase-js'


import { supabaseClientSide } from './supabase/client'
// loading plane snapshot from supabase




const { data: flightsData, error: flightsError } = await supabaseClientSide
  .from('flights')
  .select('*')
const { data: planesData, error: planesError } = await supabaseClientSide
  .from('planes')
  .select('*')
const { data: destinationsData, error: destinationsError } = await supabaseClientSide
  .from('destinations')
  .select('*')
  
// creating plane lookup table
const planeLookup: { [plane_id: number]: {
    plane_id: number,
    plane_name: string,
    total_seats: number
} } = {}
planesData?.forEach((plane) => {
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
    cost: number,
} } = {}
flightsData?.forEach((flight) => {
    const departDate = new Date(flight.departure_time)
    const diffInDays = Math.floor(
        (+departDate - +new Date()) / (1000 * 60 * 60 * 24)
    );
    flightLookup[flight.flight_id] = {
        flight_id: flight.flight_id,
        plane_id: flight.plane_id,
        destination_id: flight.destination_id,
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
destinationsData?.forEach((destination) => {
  destinationLookup[destination.destination_id] = destination
})

// returns a snapshot of the current plane data
function getPlaneData(plane_id: number) {
    return structuredClone(planeLookup[plane_id]);
}
function getFlightData(flight_id: number) {
    return structuredClone(flightLookup[flight_id]);
}
function getDestinationData(destination_id: number) {
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
type flightFilterResult = {
    destination: string,
    seats: number,
    departsIn: number,
    departureFormattedDate: string,
    planeName: string,
    cost: number,
    flightId: number,
}
function getFilteredFlightData(flightFilter: flightFilter): flightFilterResult[] {
  let filteredFlights = Object.values(flightLookup);

  // filter by destination name
  if (flightFilter.destination) {
    filteredFlights = filteredFlights.filter((flight) => {
      const destination = getDestinationData(flight.destination_id);
      const destinationStr = `${destination.city}, ${destination.country}`
      return destinationStr.toLowerCase().includes(flightFilter.destination!.toLowerCase());
    });
  }

  console.log(filteredFlights)

  // filter by cost range [min, max]
  if (flightFilter.cost) {
    const [minCost, maxCost] = flightFilter.cost;
    filteredFlights = filteredFlights.filter(
      (flight) => flight.cost >= minCost && flight.cost <= maxCost
    );
  }

  // filter by departure range [start, end] (timestamps)
  if (flightFilter.departure) {
    const [start, end] = flightFilter.departure;
    filteredFlights = filteredFlights.filter((flight) => {
      const departsIn = flight.departsIn;
    console.log(start, end, departsIn)
      return departsIn >= start && departsIn <= end;
    });
  }

  // filter by seats available (total seats - reserved seats)
  if (flightFilter.seats) {
    const [minSeats, maxSeats] = flightFilter.seats;
    filteredFlights = filteredFlights.filter((flight) => {
      const plane = getPlaneData(flight.plane_id);
      const availableSeats = plane.total_seats - flight.reserved_seats;
      return availableSeats >= minSeats && availableSeats <= maxSeats;
    });
  }

  // sort by the requested field
  if (flightFilter.sortBy) {
    const ascending = flightFilter.sortAscending ?? true;
    filteredFlights.sort((a, b) => {
      let compare = 0;

      if (flightFilter.sortBy === "Departure") {
        compare = a.departsIn - b.departsIn;
      } else if (flightFilter.sortBy === "Seats") {
        const seatsA = getPlaneData(a.plane_id).total_seats - a.reserved_seats;
        const seatsB = getPlaneData(b.plane_id).total_seats - b.reserved_seats;
        compare = seatsA - seatsB;
      } else if (flightFilter.sortBy === "Cost") {
        compare = a.cost - b.cost;
      }

      return ascending ? compare : -compare;
    });
  }

  // limit entries to min and max
  if (flightFilter.entries) {
    filteredFlights = filteredFlights.slice(flightFilter.entries[0], flightFilter.entries[1]);
  }

  // map data to bookings
  const bookings: flightFilterResult[] = filteredFlights.map((flight) => {
    const plane = getPlaneData(flight.plane_id);
    const destination = getDestinationData(flight.destination_id);
    return {
      destination: `${destination.city}, ${destination.country}`,
      seats: plane.total_seats - flight.reserved_seats,
      departsIn: flight.departsIn,
      departureFormattedDate: flight.departureDate.toLocaleString(),
      planeName: plane.plane_name,
      cost: flight.cost,
      flightId: flight.flight_id,
    };
  });
  return bookings;
}

export {getPlaneData, getFlightData, getDestinationData, getFilteredFlightData}