/*

READ ME README


YES THE CODE IS MESSY

YES I WILL ADD COMMENTS

BUT NOT NOWWWWWWWWWWWWWWWW


let's get it to work and look a little decent first, then iterate through the code and clean it
up

*/


"use client";

import { createClient } from '@supabase/supabase-js'
import "@/app/globals.css";
import {Label} from "@/components/ui/label"
import { useState, useMemo } from "react";
import {Input} from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel} from "@/components/ui/select";
import * as Slider from "@radix-ui/react-slider";
import { Button } from "@/components/ui/button";

// loading plane snapshot from supabase
const supabaseUrl = 'https://mmclsfzzxjemuuacrewm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tY2xzZnp6eGplbXV1YWNyZXdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0ODUwMjksImV4cCI6MjA4NjA2MTAyOX0.bE6b2XXYlghLYIC4pQxmlGfRC3Q4Lfl93lu2B3ikm7A'

const supabase = createClient(supabaseUrl, supabaseKey)

const { data: flightData, error: flightError } = await supabase
  .from('flights')
  .select('*')
const { data: planesData, error: planesError } = await supabase
  .from('planes')
  .select('*')

// creating plane lookup table
const planeLookup: { [planeId: number]: {name: string, seats: number} } = {}
console.log(planesData)
planesData?.forEach((plane) => {
  planeLookup[plane.plane_id] = {
    name: plane.plane_name, seats: plane.total_seats
  }
})

// creating bookings list
type Booking = {
  location: string;
  seats: number;
  departure: number;
  departureFormattedDate: string;
  planeName: string;
  cost: number;
  flightId: number;
};
const bookingsList: Booking[] = [];
flightData?.forEach((flight) => {
  console.log(flight);
  const newDate = new Date(flight.departure)
  bookingsList.push({
    location: flight.destination,
    seats: planeLookup[flight.plane_id].seats,
    departure: Math.ceil((newDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
    departureFormattedDate: `${String(newDate.getMonth() + 1).padStart(2, '0')}/${String(newDate.getDate()).padStart(2, '0')}/${newDate.getFullYear()}`,
    cost: flight.cost,
    planeName: planeLookup[flight.plane_id].name,
    flightId: flight.flight_id,
  })
})

// sort arrow function class
function SortArrow({
  active,
  ascending,
}: {
  active: boolean
  ascending: boolean | null
}) {
  if (!active) {
    return <span className="opacity-30">↕</span>
  }

  return (
    <span className="ml">
      {ascending ? "↑" : "↓"}
    </span>
  )
}

export default function BookingsPage() {
  const [priceFilter, setPriceFilter] = useState<[number, number]>([0, 1500]);
  const [departureFilter, setDepartureFilter] = useState<[number, number]>([0, 365]);
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [seatsFilter, setSeatsFilter] = useState<[number, number]>([0, 500]);

  // filtering and sorting bookings
  const [sortSetting, setSortSetting] = useState<{category: "cost" | "departure" | "seats" | null, ascending: boolean | null}>({category: null, ascending: null})

  const filteredBookings = useMemo(() => {
    // filtering
    let filtered = bookingsList.filter((b) => {
      const matchesName =
        b.location.toLowerCase().includes(locationFilter.toLowerCase());

      const matchesDeparture =
        b.departure >= departureFilter[0] && b.departure <= departureFilter[1];

      const matchesPrice =
        b.cost >= priceFilter[0] && b.cost <= priceFilter[1];

      const matchesSeats =
        b.seats >= seatsFilter[0] && b.seats <= seatsFilter[1];

      return matchesName && matchesDeparture && matchesPrice && matchesSeats;
    });

    // sorting
    filtered.sort((a, b) => {
        const modifier = sortSetting.ascending ? 1 : -1

        if (sortSetting.category === "cost") {
          return (a.cost - b.cost) * modifier
        }

        if (sortSetting.category === "departure") {
          return (a.departure - b.departure) * modifier
        }

        if (sortSetting.category === "seats") {
          return (a.seats - b.seats) * modifier
        }

        return 0
      })

    return filtered
  }, [locationFilter, departureFilter, priceFilter, seatsFilter, sortSetting]);

  return (
    <div className = "w-screen h-screen" style={{ background: "var(--background)" }}>
      <Label className="text-xl absolute left-[4rem] top-[10rem] font-bold text-[var(--foreground)]">
        Book a Flight
      </Label>
      <Label className="text-m absolute left-[4rem] top-[calc(12rem)] w-[calc(35%-6rem)] text-[var(--foreground)]">
        To book a flight, use the filters and choose your desired flight on the card on the right.
      </Label>



      {
        /*
        Filters
        Controls what elements get shown
        Current filters: name, cost, maximum departure, seats remaining

        Next: filter by which day to depart
        */
      }
      <Card className="absolute bottom-[2rem] bg-[var(--card)] left-[2rem] w-[calc(35%-3rem)] h-[calc(70%-4rem)]">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-7 list-none overflow-y-auto">
          <li>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              className="mt-3"
              onChange={(e) => setLocationFilter(e.target.value)}
            />
          </li>

          <li>
            <Label htmlFor="price">Price</Label>
            <Slider.Root
              className="relative flex w-full select-none touch-none mt-3 items-center"
              defaultValue={[0, 1500]}
              onValueChange={(val) => setPriceFilter(val as [number, number])}
              min={0}
              max={1500}
              step={10}
            >
              <Slider.Track className="bg-gray-300 relative flex-1 h-2 rounded-full">
                <Slider.Range className="absolute bg-blue-500 h-full rounded-full" />
              </Slider.Track>

              <Slider.Thumb className="block w-5 h-5 bg-white border border-gray-400 rounded-full shadow-md" />
              <Slider.Thumb className="block w-5 h-5 bg-white border border-gray-400 rounded-full shadow-md" />
            </Slider.Root>

            <div className="mt-2 text-gray-700">
              Selected range: ${priceFilter[0]} – ${priceFilter[1]}
            </div>
          </li>

          <li>
            <Label htmlFor="departure">Departure</Label>
            <Slider.Root
              className="relative flex w-full select-none touch-none mt-3 items-center"
              defaultValue={[0, 365]}
              onValueChange={(val) => setDepartureFilter(val as [number, number])}
              min={0}
              max={365}
              step={1}
            >
              <Slider.Track className="bg-gray-300 relative flex-1 h-2 rounded-full">
                <Slider.Range className="absolute bg-blue-500 h-full rounded-full" />
              </Slider.Track>

              <Slider.Thumb className="block w-5 h-5 bg-white border border-gray-400 rounded-full shadow-md" />
              <Slider.Thumb className="block w-5 h-5 bg-white border border-gray-400 rounded-full shadow-md" />
            </Slider.Root>

            <div className="mt-2 text-gray-700">
              In {departureFilter[0]} to {departureFilter[1]} days
            </div>
          </li>

          <li>
            <Label htmlFor="seats">Seats</Label>
            <Slider.Root
              className="relative flex w-full select-none touch-none mt-3 items-center"
              defaultValue={[0, 500]}
              onValueChange={(val) => setSeatsFilter(val as [number, number])}
              min={0}
              max={500}
              step={1}
            >
              <Slider.Track className="bg-gray-300 relative flex-1 h-2 rounded-full">
                <Slider.Range className="absolute bg-blue-500 h-full rounded-full" />
              </Slider.Track>

              <Slider.Thumb className="block w-5 h-5 bg-white border border-gray-400 rounded-full shadow-md" />
              <Slider.Thumb className="block w-5 h-5 bg-white border border-gray-400 rounded-full shadow-md" />
            </Slider.Root>

            <div className="mt-2 text-gray-700">
              Has {seatsFilter[0]} to {seatsFilter[1]} seats
            </div>
          </li>
        </CardContent>
      </Card>



      {
        /*
        The actual flight content
        Displays flight id, plane name, location, seats remaining, departure date and relative time, and cost

        Sorting available when you click on the "seats", "departure", or "cost" buttons
        */
      }
      <Card className="absolute top-[2rem] bg-[var(--card)] right-[2rem] w-[calc(65%-3rem)] h-[calc(100%-4rem)]">
        <CardContent className="relative">
          <CardTitle className="text-lg font-bold">Bookings Overview</CardTitle>
        </CardContent>

        {
          /*
          This is where the titles are displayed
          */
        }
        <CardContent className="relative">
          <div
            className="flex items-center gap-x-3 px-10 mr-3s"
          >
            <span className="w-[20px] truncate text-center font-bold text-gray-800">ID</span>
            <span className="w-[100px] truncate text-center font-bold text-gray-800">Plane Name</span>
            <span className="w-[150px] truncate text-center font-bold text-gray-800">Location</span>
            <Button
              variant="ghost"
              className="w-[80px] truncate font-bold text-gray-700"
              onClick={() => setSortSetting({category: "seats", ascending: sortSetting.category == "seats" && !sortSetting.ascending || false})}
            >
              Seats
              <SortArrow
                active={sortSetting.category === "seats"}
                ascending={sortSetting.ascending}
              />
            </Button>
            <Button
              variant="ghost"
              className="flex-1 truncate font-bold text-gray-700"
              onClick={() => setSortSetting({category: "departure", ascending: sortSetting.category == "departure" && !sortSetting.ascending || false})}
            >
              Departure
              <SortArrow
                active={sortSetting.category === "departure"}
                ascending={sortSetting.ascending}
              />
            </Button>
            <Button
              variant="ghost"
              className="w-[80px] truncate font-bold text-gray-900"
              onClick={() => setSortSetting({category: "cost", ascending: sortSetting.category == "cost" && !sortSetting.ascending || false})}
            >
              Cost
              <SortArrow
                active={sortSetting.category === "cost"}
                ascending={sortSetting.ascending}
              />
            </Button>
          </div>
        </CardContent>

        {
          /*
          This is where the flight bars are displayed
          */
        }
        <CardContent className="relative bottom-6 space-y-2 overflow-y-auto py-3">
          {filteredBookings.map((booking, idx) => (
            <div
              key={idx}
              className="flex items-center gap-x-3 px-10 bg-gray-100 hover:bg-gray-100 rounded-xl bg-gray bg-white transition py-2 shadow-[0_0px_3px_rgba(0,0,0,0.05)] border border-gray-200"
            >
              <span className="w-[20px] truncate text-center font-medium text-gray-800">{booking.flightId}</span>
              <span className="w-[100px] truncate text-center font-medium text-gray-800">{booking.planeName}</span>
              <span className="w-[150px] truncate text-center font-medium text-gray-800">{booking.location}</span>
              <span className="w-[80px] truncate text-center text-gray-700">{booking.seats} seats</span>
              <span className="flex-1 truncate text-center text-gray-700">{booking.departureFormattedDate} → In {booking.departure} day(s)</span>
              <span className="w-[80px] truncate text-center font-semibold text-gray-900">${booking.cost}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}