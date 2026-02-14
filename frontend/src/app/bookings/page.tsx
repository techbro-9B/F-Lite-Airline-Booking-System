"use client";

import "@/app/globals.css";
import {Label} from "@/components/ui/label"
import * as React from "react"
import {Input} from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription} from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel} from "@/components/ui/select";
import * as Slider from "@radix-ui/react-slider";

type Booking = {
  location: string;
  bookings: number;
  departure: string;
  cost: string;
};

const bookingsList: Booking[] = [
  { location: "New York", bookings: 120, departure: "10 Feb", cost: "$450" },
  { location: "Los Angeles", bookings: 85, departure: "15 Feb", cost: "$380" },
  { location: "Chicago", bookings: 60, departure: "20 Feb", cost: "$300" },
  { location: "Nevada", bookings: 60, departure: "20 Feb", cost: "$300" },
  { location: "Narnia", bookings: 60, departure: "20 Feb", cost: "$300" },
  { location: "School", bookings: 60, departure: "20 Feb", cost: "$300" },
  { location: "Epstien Island", bookings: 60, departure: "20 Feb", cost: "$900" },
  { location: "CCP County", bookings: 60, departure: "20 Feb", cost: "$900" },
];

export default function BookingsPage() {
  const [range, setRange] = React.useState<[number, number]>([0, 1500]);
  const [departureDays, setDepartureDays] = React.useState<[number]>([0]);

  return (
    <div className = "w-screen h-screen" style={{ background: "var(--background)" }}>
      <Label className="text-xl absolute left-[4rem] top-[10rem] font-bold text-white">
        Book a Flight
      </Label>
      <Label className="text-m absolute left-[4rem] top-[calc(12rem)] w-[calc(35%-6rem)] text-white">
        To book a flight, use the filters and choose your desired flight on the card on the right.
      </Label>
      <Card className="absolute bottom-[2rem] bg-[var(--card)] left-[2rem] w-[calc(35%-3rem)] h-[calc(70%-4rem)] shadow-[0_10px_25px_rgba(0,0,0,0.3)]">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>

        <CardContent className="flex flex-col gap-7 list-none">
          <li>
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Enter name" className="mt-3"/>
          </li>

          <li>
            <Label htmlFor="price">Price</Label>
            <Slider.Root
              className="relative flex w-full select-none touch-none mt-3 items-center"
              defaultValue={[0, 1500]}
              onValueChange={(val) => setRange(val as [number, number])}
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
              Selected range: ${range[0]} – ${range[1]}
            </div>
          </li>

          <li>
            <Label htmlFor="price">Departure</Label>
            <Slider.Root
              className="relative flex w-full select-none touch-none mt-3 items-center"
              defaultValue={[0]}
              onValueChange={(val) => setDepartureDays(val as [number])}
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
              In {departureDays[0]} Days
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
      <Card className="absolute top-[2rem] bg-[var(--card)] right-[2rem] w-[calc(65%-3rem)] h-[calc(100%-4rem)] shadow-[0_10px_25px_rgba(0,0,0,0.3)">
        <CardHeader>
        <CardTitle className="text-lg font-semibold">Bookings Overview</CardTitle>
      </CardHeader>

      <div
        className="ml-3 mr-3 flex justify-between items-center px-4 py-2s"
      >
        <span className="w-1/4 text-left font-bold text-gray-800">Location</span>
        <span className="w-1/4 text-left font-bold font-boldtext-gray-700">Bookings</span>
        <span className="w-1/4 text-left font-bold text-gray-700">Departure</span>
        <span className="w-1/4 text-right font-bold text-gray-900">Cost</span>
      </div>
      <CardContent className="space-y-3">
        {bookingsList.map((booking, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center bg-gray-100 rounded-xl px-4 py-2 hover:bg-gray-200 transition"
          >
            <span className="w-1/4 text-left font-medium text-gray-800">{booking.location}</span>
            <span className="w-1/4 text-left text-gray-700">{booking.bookings} bookings</span>
            <span className="w-1/4 text-left text-gray-700">{booking.departure}</span>
            <span className="w-1/4 text-right font-semibold text-gray-900">{booking.cost}</span>
          </div>
        ))}
      </CardContent>
      </Card>
    </div>
  )
}