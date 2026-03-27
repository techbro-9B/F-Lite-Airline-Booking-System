"use client"

import ConfirmationMenu from "./components/ConfirmationMenu";
import { getFilteredFlightData } from "@/lib/flightQuery";
import { flightFilterResult } from "@/lib/flightQuery";
import { FlightDetails } from "@/lib/types";
import "@/app/globals.css";
import { Label } from "@/components/ui/label"
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as Slider from "@radix-ui/react-slider";
import { Button } from "@/components/ui/button";
import { BookingsNavBar } from "@/components/BookingsNavBar";
import { createClient } from "@/lib/supabase/client";

// ─── Sort arrow ───────────────────────────────────────────────────────────────

function SortArrow({ active, ascending }: { active: boolean; ascending: boolean | null }) {
  if (!active) return <span className="opacity-30">↕</span>
  return <span className="ml-1">{ascending ? "↑" : "↓"}</span>
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BookingsPage() {

  // ── Auth ───────────────────────────────────────────────────────────────────
  const [validUser, setValidUser] = useState(false)

  useEffect(() => {
    const checkUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setValidUser(!!user) // !! converts user object to true, null to false
    }
    checkUser()
  }, [])

  // the filters
  const [costFilter, setCostFilter] = useState<[number, number]>([0, 1500]);
  const [departureFilter, setDepartureFilter] = useState<[number, number]>([0, 365]);
  const [destinationFilter, setDestinationFilter] = useState<string>("");
  const [seatsFilter, setSeatsFilter] = useState<[number, number]>([0, 500]);

  // for sorting
  const [sortSetting, setSortSetting] = useState<{
    category: "Cost" | "Departure" | "Seats" | null
    ascending: boolean | null
  }>({ category: null, ascending: null })

  
  // sets & stores the flights listed after filter
  const [filteredBookings, setFilteredBookings] = useState<flightFilterResult[]>([])

  //Confirmation menu state.. whether it's open or not
  const [confirmOpen,  setConfirmOpen]  = useState(false)
  const [flightDetails, setFlightDetails] = useState<FlightDetails | null>(null) /// reaaally important😍
  // Track how many seats the user wants to book (passed to ConfirmationMenu)
  const [seatsWanted, setSeatsWanted] = useState(1)

  // Fetch flights whenever filters/sort change
  useEffect(() => {
    let isMounted = true
    getFilteredFlightData({
      destination:   destinationFilter,
      cost:          costFilter,
      departure:     departureFilter,
      seats:         seatsFilter,
      entries:       null,
      sortBy:        sortSetting.category,
      sortAscending: sortSetting.ascending,
    }).then((bookings) => {
      if (isMounted) setFilteredBookings(bookings)
    })
    return () => { isMounted = false }
  }, [destinationFilter, departureFilter, costFilter, seatsFilter, sortSetting])

  //oggle sort helper
  const toggleSort = (category: "Cost" | "Departure" | "Seats") => {
    setSortSetting(prev => ({
      category,
      ascending: prev.category === category ? !prev.ascending : true,
    }))
  }

  // ── Open confirmation for a booking row ───────────────────────────────────
  const openConfirm = (booking: flightFilterResult) => {
    setFlightDetails({
      flight_id:      booking.flightId,
      flight_number:  booking.flightNumber  ?? `FL-${booking.flightId}`,
      departure_time: booking.departureFormattedDate,
      arrival_time:   booking.arrivalFormattedDate  ?? '',
      status:         booking.status               ?? 'scheduled',
      origin: {
        name:         booking.origin,
        airport_code: booking.originCode     ?? '',
        city:         booking.origin,
      },
      destination: {
        name:         booking.destination,
        airport_code: booking.destinationCode ?? '',
        city:         booking.destination,
      },
      plane:   { plane_name: booking.planeName },
      pricing: {
        seat_class:      booking.seatClass      ?? 'economy',
        base_price:      booking.cost,
        seats_available: booking.seats,
      },
    })
    setSeatsWanted(1) // reset to 1 each time a new flight is selected
    setConfirmOpen(true)
  }

  // ── Render 
  return (
    <div style={{ overflow: "hidden", height: "100vh", width: "100vw" }}>

      {/* Navbar — show BookingsNavBar when user logged in, plain nav when not */}
      {validUser ? <BookingsNavBar /> : <BookingsNavBar />}

      <ConfirmationMenu
        open={confirmOpen}
        close={() => setConfirmOpen(false)}
        flightDetails={flightDetails}
        seatsWanted={seatsWanted}
        setSeatsWanted={setSeatsWanted}
      />

      <div
        className="w-screen h-screen"
        style={{ flex: 1, position: "absolute", overflow: "hidden", background: "var(--background)" }}
      >
        <Label className="text-xl absolute left-[4rem] top-[10rem] font-bold text-[var(--foreground)]">
          Book a Flight
        </Label>
        <Label className="text-m absolute left-[4rem] top-[calc(12rem)] w-[calc(35%-6rem)] text-[var(--foreground)]">
          Use the filters and choose your desired flight on the card on the right.
        </Label>

        {/* ── Filters ──────────────────────────────────────────────────────── */}
        <Card className="absolute bottom-[2rem] bg-[var(--card)] left-[2rem] w-[calc(35%-3rem)] h-[calc(70%-4rem)]">
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-7 list-none overflow-y-auto">

            <li>
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                className="mt-3"
                onChange={(e) => setDestinationFilter(e.target.value)}
              />
            </li>

            <li>
              <Label>Price</Label>
              <Slider.Root
                className="relative flex w-full select-none touch-none mt-3 items-center"
                defaultValue={[0, 1500]}
                onValueChange={(val) => setCostFilter(val as [number, number])}
                min={0} max={1500} step={10}
              >
                <Slider.Track className="bg-gray-300 relative flex-1 h-2 rounded-full">
                  <Slider.Range className="absolute bg-blue-500 h-full rounded-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-5 h-5 bg-white border border-gray-400 rounded-full shadow-md" />
                <Slider.Thumb className="block w-5 h-5 bg-white border border-gray-400 rounded-full shadow-md" />
              </Slider.Root>
              <div className="mt-2 text-gray-700 text-sm">${costFilter[0]} – ${costFilter[1]}</div>
            </li>

            <li>
              <Label>Departure</Label>
              <Slider.Root
                className="relative flex w-full select-none touch-none mt-3 items-center"
                defaultValue={[0, 365]}
                onValueChange={(val) => setDepartureFilter(val as [number, number])}
                min={0} max={365} step={1}
              >
                <Slider.Track className="bg-gray-300 relative flex-1 h-2 rounded-full">
                  <Slider.Range className="absolute bg-blue-500 h-full rounded-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-5 h-5 bg-white border border-gray-400 rounded-full shadow-md" />
                <Slider.Thumb className="block w-5 h-5 bg-white border border-gray-400 rounded-full shadow-md" />
              </Slider.Root>
              <div className="mt-2 text-gray-700 text-sm">In {departureFilter[0]} to {departureFilter[1]} days</div>
            </li>

            <li>
              <Label>Seats</Label>
              <Slider.Root
                className="relative flex w-full select-none touch-none mt-3 items-center"
                defaultValue={[0, 500]}
                onValueChange={(val) => setSeatsFilter(val as [number, number])}
                min={0} max={500} step={1}
              >
                <Slider.Track className="bg-gray-300 relative flex-1 h-2 rounded-full">
                  <Slider.Range className="absolute bg-blue-500 h-full rounded-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-5 h-5 bg-white border border-gray-400 rounded-full shadow-md" />
                <Slider.Thumb className="block w-5 h-5 bg-white border border-gray-400 rounded-full shadow-md" />
              </Slider.Root>
              <div className="mt-2 text-gray-700 text-sm">{seatsFilter[0]} to {seatsFilter[1]} seats</div>
            </li>

          </CardContent>
        </Card>

        {/* ── Flight list ───────────────────────────────────────────────────── */}
        <Card className="absolute top-[2rem] bg-[var(--card)] right-[2rem] w-[calc(65%-3rem)] h-[calc(100%-4rem)] gap-0 px-2 py-4">
          <CardContent className="relative">
            <CardTitle className="text-lg font-bold">Bookings Overview</CardTitle>
          </CardContent>

          {/* Column headers */}
          <CardContent className="relative">
            <div className="flex items-center gap-x-3 px-5">
              <span className="w-[20px] truncate text-left font-bold text-gray-800">ID</span>
              <span className="w-[100px] truncate text-center font-bold text-gray-800">Plane</span>
              <span className="w-[150px] truncate text-center font-bold text-gray-800">Destination</span>
              <Button variant="ghost" className="w-[80px] font-bold text-gray-700"
                onClick={() => toggleSort("Seats")}>
                Seats <SortArrow active={sortSetting.category === "Seats"} ascending={sortSetting.ascending} />
              </Button>
              <Button variant="ghost" className="flex-1 font-bold text-gray-700"
                onClick={() => toggleSort("Departure")}>
                Departure <SortArrow active={sortSetting.category === "Departure"} ascending={sortSetting.ascending} />
              </Button>
              <Button variant="ghost" className="w-[80px] font-bold text-gray-900"
                onClick={() => toggleSort("Cost")}>
                Cost <SortArrow active={sortSetting.category === "Cost"} ascending={sortSetting.ascending} />
              </Button>
            </div>
          </CardContent>

          {/* Flight rows */}
          <CardContent className="ml-2 mr-2 flex-1 space-y-2 overflow-y-auto py-3 rounded-xl border border-gray-200">
            {filteredBookings.length === 0 && (
              <p className="text-center text-gray-400 py-12 text-sm">No flights match your filters.</p>
            )}
            {filteredBookings.map((booking, idx) => (
              <div
                key={idx}
                className="flex items-center gap-x-3 px-4 bg-white hover:bg-blue-50 rounded-xl transition py-2 shadow-[0_0px_3px_rgba(0,0,0,0.05)] border border-gray-200 cursor-pointer"
                onMouseDown={() => openConfirm(booking)}
              >
                <span className="w-[20px] truncate text-center font-medium text-gray-800">{booking.flightId}</span>
                <span className="w-[100px] truncate text-center font-medium text-gray-800">{booking.planeName}</span>
                <span className="w-[150px] truncate text-center font-medium text-gray-800">{booking.destination}</span>
                <span className="w-[80px] truncate text-center text-gray-700">{booking.seats} seats</span>
                <span className="flex-1 truncate text-center text-gray-700">
                  {booking.departureFormattedDate} → In {booking.departsIn} day(s)
                </span>
                <span className="w-[80px] truncate text-center font-semibold text-gray-900">
                  ${booking.cost.toFixed(2)}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
