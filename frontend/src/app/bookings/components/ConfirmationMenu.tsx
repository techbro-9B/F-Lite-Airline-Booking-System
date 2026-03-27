"use client";

import "@/app/globals.css";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FlightDetails } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

// types that'll be used
type ConfirmationMenuProps = {
  open:           boolean
  close:          () => void
  flightDetails?: FlightDetails | null
  seatsWanted:    number
  setSeatsWanted: (n: number) => void
};



// the confrimation menus on the same page as the bookings page
export default function ConfirmationMenu({
  open,
  close,
  flightDetails,
  seatsWanted,
  setSeatsWanted,
}: ConfirmationMenuProps) {
  const router = useRouter()

  const [validUser, setValidUser] = useState(false)
  let user;
  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setValidUser(!!user) // !! converts user object to true, null to false
    }
    getUser()
  }, [])

  
  if (!open) return null

  const seatClass  = flightDetails?.pricing?.seat_class ?? "economy"
  const priceEach  = flightDetails?.pricing?.base_price ?? 0
  const maxSeats   = flightDetails?.pricing?.seats_available ?? 1
  const total      = priceEach * seatsWanted;

  
  return (
    // Backdrop
    <div
      style={{ position: "fixed", inset: 0, zIndex: 1000 }}
      onClick={close} // click outside to dismiss
    >
      {/* Blur layer */}
      <div style={{ height: "100%", width: "100%", backdropFilter: "blur(6px)", backgroundColor: "rgba(0,0,0,0.2)" }} />
      <span>{user.user_metadata}</span>
      {/* Modal card — stop clicks from bubbling to backdrop */}
      <Card
        onClick={(e) => e.stopPropagation()}
        style={{
          position:  "fixed",
          top:       "50%",
          left:      "50%",
          transform: "translate(-50%, -50%)",
          width:     420,
          padding:   24,
        }}
      >
        <CardTitle style={{ fontWeight: "bold", fontSize: 28, marginBottom: 16 }}>
          Confirm Booking
        </CardTitle>

        <CardContent className="space-y-3 p-0">

          {/* Flight info */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm text-gray-700">
            <div className="flex justify-between">
              <span className="font-medium text-gray-500">Flight</span>
              <span className="font-semibold">{flightDetails?.flight_number ?? `FL-${flightDetails?.flight_id}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-500">Origin</span>
              <span>{flightDetails?.origin.name} ({flightDetails?.origin.airport_code})</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-500">Destination</span>
              <span>{flightDetails?.destination.name} ({flightDetails?.destination.airport_code})</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-500">Departure</span>
              <span>{flightDetails?.departure_time}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-gray-500">Class</span>
              <span className="capitalize">{seatClass.replace("_", " ")}</span>
            </div>
          </div>

          {/* Seat counter */}
          <div className="flex items-center justify-between px-2 py-3">
            <span className="text-sm font-medium text-gray-700">Seats</span>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSeatsWanted(Math.max(1, seatsWanted - 1))}
                disabled={seatsWanted <= 1}
                className="w-8 h-8 rounded-full border border-gray-300 font-bold hover:bg-gray-100 disabled:opacity-30 transition-all"
              >
                −
              </button>
              <span className="text-xl font-bold w-6 text-center tabular-nums">{seatsWanted}</span>
              <button
                onClick={() => setSeatsWanted(Math.min(maxSeats, seatsWanted + 1))}
                disabled={seatsWanted >= maxSeats}
                className="w-8 h-8 rounded-full border border-gray-300 font-bold hover:bg-gray-100 disabled:opacity-30 transition-all"
              >
                +
              </button>
            </div>
          </div>

          {/* Price summary */}
          <div className="bg-gray-50 rounded-xl px-4 py-3 flex justify-between items-center text-sm">
            <span className="text-gray-500">${priceEach.toFixed(2)} × {seatsWanted} seat{seatsWanted > 1 ? "s" : ""}</span>
            <span className="font-bold text-gray-900 text-base">${total.toFixed(2)} CAD</span>
          </div>

          {/* Logo */}
          <Image
            src="/F-lite-logo-bg.svg"
            alt="F-lite logo"
            width={60}
            height={60}
            
          />

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={close}
            >
              Cancel
            </Button>
            <Link href={"paymentgate"}
              className={cn(buttonVariants({variant:"default"}))}
            >
              Next →
            </Link>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
