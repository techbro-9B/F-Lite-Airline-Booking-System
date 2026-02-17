"use client";

import "@/app/globals.css";
import {Label} from "@/components/ui/label"
import { useState, useMemo } from "react";
import {Input} from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel} from "@/components/ui/select";
import * as Slider from "@radix-ui/react-slider";
import { Switch } from "@/components/ui/switch";

type Booking = {
  location: string;
  seats: number;
  departure: number;
  cost: number;
};

const bookingsList: Booking[] = [
  { location: "New York", seats: 120, departure: 3, cost: 450 },
  { location: "Los Angeles", seats: 85, departure: 2, cost: 380},
  { location: "Chicago", seats: 60, departure: 1, cost: 900 },
  { location: "Nevada", seats: 60, departure: 1, cost: 900 },
  { location: "Narnia", seats: 60, departure: 5, cost: 900 },
  { location: "School", seats: 60, departure: 5, cost: 900 },
  { location: "Yepsteen Island", seats: 60, departure: 16, cost: 900 },
  { location: "CCP County", seats: 60, departure: 16, cost: 900 },
  { location: "Tokyo", seats: 0, departure: 16, cost: 900 },
  { location: "The Sun", seats: 0, departure: 16, cost: 1434 },
  { location: "188 Pearson Lane", seats: 60, departure: 16, cost: 900 },
  { location: "1881 Pearson Lane", seats: 60, departure: 16, cost: 900 },
  { location: "18811 Pearson Lane", seats: 60, departure: 6, cost: 900 },
  { location: "188111 Pearson Lane", seats: 0, departure: 2, cost: 900 },
  { location: "Suspicious Island With Apparently No Files", seats: 0, departure: 2, cost: 900 },
];

export default function BookingsPage() {
  const [priceFilter, setPriceFilter] = useState<[number, number]>([0, 1500]);
  const [departureFilter, setDepartureFilter] = useState<[number, number]>([0, 90]);
  const [nameFilter, setNameFilter] = useState<string>("");
  const [seatsFilter, setSeatsFilter] = useState<[number, number]>([0, 500]);

  const filteredBookings = useMemo(() => {
    return bookingsList.filter((b) => {
      const matchesName =
        b.location.toLowerCase().includes(nameFilter.toLowerCase());

      const matchesDeparture =
        b.departure >= departureFilter[0] && b.departure <= departureFilter[1];

      const matchesPrice =
        b.cost >= priceFilter[0] && b.cost <= priceFilter[1];

      const matchesSeats =
        b.seats >= seatsFilter[0] && b.seats <= seatsFilter[1];

      return matchesName && matchesDeparture && matchesPrice && matchesSeats;
    });
  }, [nameFilter, departureFilter, priceFilter, seatsFilter]);

  return (
    <div className = "w-screen h-screen" style={{ background: "var(--background)" }}>
      <Label className="text-xl absolute left-[4rem] top-[10rem] font-bold text-[var(--foreground)]">
        Book a Flight
      </Label>
      <Label className="text-m absolute left-[4rem] top-[calc(12rem)] w-[calc(35%-6rem)] text-[var(--foreground)]">
        To book a flight, use the filters and choose your desired flight on the card on the right.
      </Label>
      <Card className="absolute bottom-[2rem] bg-[var(--card)] left-[2rem] w-[calc(35%-3rem)] h-[calc(70%-4rem)] shadow-[0_10px_25px_rgba(0,0,0,0.3)]">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-7 list-none overflow-y-auto">
          <li>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Enter name"
              className="mt-3"
              onChange={(e) => setNameFilter(e.target.value)}
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
              defaultValue={[0, 90]}
              onValueChange={(val) => setDepartureFilter(val as [number, number])}
              min={0}
              max={90}
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

          <li>
            <Label htmlFor="category">Category</Label>
            <Select>
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Select a thing"/>
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectGroup>
                  <SelectLabel>Stuff</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </li>
        </CardContent>
      </Card>
      <Card className="absolute top-[2rem] bg-[var(--card)] right-[2rem] w-[calc(65%-3rem)] h-[calc(100%-4rem)] shadow-[0_10px_25px_rgba(0,0,0,0.3)]">
        <CardHeader>
        <CardTitle className="text-lg font-semibold">Bookings Overview</CardTitle>
      </CardHeader>

      <div
        className="ml-3 mr-3 flex justify-between items-center px-4 py-2s"
      >
        <span className="w-1/4 text-left font-bold text-gray-800">Location</span>
        <span className="w-1/4 text-left font-bold font-boldtext-gray-700">seats</span>
        <span className="w-1/4 text-left font-bold text-gray-700">Departure</span>
        <span className="w-1/4 text-right font-bold text-gray-900">Cost</span>
      </div>
      <CardContent className="space-y-3 overflow-y-auto">
        {filteredBookings.map((booking, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center bg-gray-100 rounded-xl px-4 py-2 hover:bg-gray-200 transition"
          >
            <span className="w-1/4 text-left font-medium text-gray-800">{booking.location}</span>
            <span className="w-1/4 text-left text-gray-700">{booking.seats} seats</span>
            <span className="w-1/4 text-left text-gray-700">In {booking.departure} day(s)</span>
            <span className="w-1/4 text-right font-semibold text-gray-900">${booking.cost}</span>
          </div>
        ))}
      </CardContent>
      </Card>
    </div>
  )
}