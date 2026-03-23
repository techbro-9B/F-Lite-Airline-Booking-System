"use client";
/*

READ ME README


YES THE CODE IS MESSY

YES I WILL ADD COMMENTS

BUT NOT NOWWWWWWWWWWWWWWWW

let's get it to work and look a little decent first, then iterate through the code and clean it
up

lol.... <-- lloyd
*/

import ConfirmationMenu from "./components/ConfirmationMenu";
import {getFilteredFlightData} from "@/lib/flightQuery"
import type {flightFilterResult} from "@/lib/flightQuery"
import "@/app/globals.css";
import {Label} from "@/components/ui/label"
import { useState, useEffect } from "react";
import {Input} from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import * as Slider from "@radix-ui/react-slider";
import { Button } from "@/components/ui/button";
import { HomeNavBar } from "../homepage/components/HomeNavBar";
import { createClient } from "@/lib/supabase/client";
import { BookingsNavBar } from "@/components/BookingsNavBar";
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

  /// Lloyd added this... this is to check if the user exists from the cookies with the page is rendered..
  const [validuser, setValidUser] = useState(false)

    // checking if the user exists to render somestuff like the logout button.
    let user
    useEffect(()=>{

        const fetchUser = async()=>{

            const supabase = await createClient()
            const {data:{user}} = await supabase.auth.getUser()
            return user
        }

        user = fetchUser()
    },[])

    if(user) setValidUser(true) // if this is the case... certain stuff will be rendered like the custom navbar!

  const [costFilter, setCostFilter] = useState<[number, number]>([0, 1500]);
  const [departureFilter, setDepartureFilter] = useState<[number, number]>([0, 365]);
  const [destinationFilter, setDestinationFilter] = useState<string>("");
  const [seatsFilter, setSeatsFilter] = useState<[number, number]>([0, 500]);

  // filtering and sorting bookings
  const [sortSetting, setSortSetting] = useState<{category: "Cost" | "Departure" | "Seats" | null, ascending: boolean | null}>({category: null, ascending: null})

  const [filteredBookings, setFilteredBookings] = useState<flightFilterResult[]>([]);

  // ✅ Effect to fetch filtered bookings whenever filters change
  useEffect(() => {
    let isMounted = true;

    getFilteredFlightData({
      destination: destinationFilter,
      cost: costFilter,
      departure: departureFilter,
      seats: seatsFilter,
      entries: null,
      sortBy: sortSetting.category,
      sortAscending: sortSetting.ascending,
    }).then((bookings) => {
      if (isMounted) setFilteredBookings(bookings);
    });

    return () => { isMounted = false }; // cleanup
  }, [destinationFilter, departureFilter, costFilter, seatsFilter, sortSetting]);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmationData, setConfirmationData] = useState<{
    destination: string,
    departure: string,
    seats: number,
  }>({
    destination: "",
    departure: "",
    seats: 0,
  });

  return (
    // below is where the supabase base user thingy is applied
    <div style={{overflow:"hidden", height: "100vh", width: "100vw"}}>
      
      { 
        validuser? 
        <HomeNavBar/>: // if no user, this navbar is rendered
        <BookingsNavBar/> // if the user is logged in... this navbar is rendered.
                }
      <div className = "w-screen h-screen" style={{flex: 1, position: "absolute", overflow: "hidden", background: "var(--background)" }}>

        {/* <ConfirmationMenu/> */}
        <ConfirmationMenu
          open={confirmOpen}
          close={() => setConfirmOpen(false)}
          confirmationData={confirmationData}
        />

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
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                className="mt-3"
                onChange={(e) => setDestinationFilter(e.target.value)}
              />
            </li>

            <li>
              <Label htmlFor="price">Price</Label>
              <Slider.Root
                className="relative flex w-full select-none touch-none mt-3 items-center"
                defaultValue={[0, 1500]}
                onValueChange={(val) => setCostFilter(val as [number, number])}
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
                Selected range: ${costFilter[0]} – ${costFilter[1]}
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
          Displays flight id, plane name, destination, seats remaining, departure date and relative time, and cost

          Sorting available when you click on the "seats", "departure", or "cost" buttons
          */
        }
        <Card className="absolute top-[2rem] bg-[var(--card)] right-[2rem] w-[calc(65%-3rem)] h-[calc(100%-4rem)] gap-0 px-2 py-4">
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
              className="flex items-center gap-x-3 px-5"
            >
              <span className="w-[20px] truncate text-left font-bold text-gray-800">ID</span>
              <span className="w-[100px] truncate text-center font-bold text-gray-800">Plane Name</span>
              <span className="w-[150px] truncate text-center font-bold text-gray-800">Destination</span>
              <Button
                variant="ghost"
                className="ml-2 w-[80px] truncate font-bold text-gray-700"
                onClick={() => setSortSetting({category: "Seats", ascending: sortSetting.category == "Seats" && !sortSetting.ascending || false})}
              >
                Seats
                <SortArrow
                  active={sortSetting.category === "Seats"}
                  ascending={sortSetting.ascending}
                />
              </Button>
              <Button
                variant="ghost"
                className="flex-1 truncate font-bold text-gray-700"
                onClick={() => setSortSetting({category: "Departure", ascending: sortSetting.category == "Departure" && !sortSetting.ascending || false})}
              >
                Departure
                <SortArrow
                  active={sortSetting.category === "Departure"}
                  ascending={sortSetting.ascending}
                />
              </Button>
              <Button
                variant="ghost"
                className="w-[80px] truncate font-bold text-gray-900 text-right"
                onClick={() => setSortSetting({category: "Cost", ascending: sortSetting.category == "Cost" && !sortSetting.ascending || false})}
              >
                Cost
                <SortArrow
                  active={sortSetting.category === "Cost"}
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
          <CardContent className="ml-2 mr-2 flex-1 space-y-2 overflow-y-auto py-3 rounded-xl border border-gray-200">
            {filteredBookings.map((booking, idx) => (
              <div
                key={idx}
                className="flex items-center gap-x-3 px-4 bg-gray-100 hover:bg-gray-100 rounded-xl bg-gray bg-white transition py-2 shadow-[0_0px_3px_rgba(0,0,0,0.05)] border border-gray-200"
                onMouseDown={() => {
                  setConfirmOpen(true);
                  setConfirmationData({
                    destination: booking.destination,
                    seats: booking.seats,
                    departure: booking.departureFormattedDate + " → In " + booking.departsIn + " day(s)",
                  })
                }}
              >
                <span className="w-[20px] truncate text-center font-medium text-gray-800">{booking.flightId}</span>
                <span className="w-[100px] truncate text-center font-medium text-gray-800">{booking.planeName}</span>
                <span className="w-[150px] truncate text-center font-medium text-gray-800">{booking.destination}</span>
                <span className="w-[80px] truncate text-center text-gray-700">{booking.seats} seats</span>
                <span className="flex-1 truncate text-center text-gray-700">{booking.departureFormattedDate} → In {booking.departsIn} day(s)</span>
                <span className="w-[80px] truncate text-center font-semibold text-gray-900">${booking.cost.toFixed(2)}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
    
  
  )
}