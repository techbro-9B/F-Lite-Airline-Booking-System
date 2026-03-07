"use client";

import "@/app/globals.css";
import React from "react";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";    
import { useRouter } from "next/navigation";
import Link from "next/link";

type ConfirmationMenuProps = {
  open: boolean;
  close: () => void;
  confirmationData: confirmationData;
};
type confirmationData = {
    destination: string,
    departure: string,
    seats: number,
  }

export default function ConfirmationMenu({
    open, close, confirmationData
}: ConfirmationMenuProps) {
    if (!open) return null;
    return (
        <div style={{position: "fixed", zIndex: 1000}}>
            <div style={{height: '100vh', width: '100vw', backgroundColor: "rgba(0,0,0,0)", backdropFilter: "blur(6px)"}}/>
            <Card style={{
                position: 'fixed',
                top: "50%",
                left: "50%",
                height: '300px',
                width: '400px',
                padding: 15,
                paddingLeft: 20,
                transform: 'translate(-50%, -50%)',
            }}>
                <CardTitle style={{fontWeight: "bold", fontSize: 35}}>Confirm Order</CardTitle>
                <CardContent>
                    <div>Destination: {confirmationData.destination}</div>
                    
                    <div>Departure: {confirmationData.departure}</div>

                    <div>Seats: {confirmationData.seats}</div>
                    
                    {/* Actions */}
                    <Button style={{
                        position: "fixed",
                        right: 10,
                        bottom: 10,
                        width: 100,
                    }}><Link href="/bookings/seatselection">Next</Link></Button>
                    <Button
                        style={{
                            position: "fixed",
                            right: 120,
                            bottom: 10,
                            width: 100,
                            background: "var(--destructive)",
                        }}
                        onClick={close}
                    >
                        Cancel
                    </Button>

                    {/* Logo */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="80"
                        height="80"
                        viewBox="0 0 250 250"
                        style={{
                            position: "fixed",
                            left: 25,
                            bottom: -20,
                        }}
                    >
                        <defs>
                        <clipPath id="clip-Logo">
                            <rect width="250" height="250" />
                        </clipPath>
                        </defs>
                        <g clipPath="url(#clip-Logo)">
                        <path
                            d="M75,33.309c14.976-.163,88.529-53.3,88.529-53.3s-41.339,43.16-49.6,61.838c0,0,36.092.064,46.411,0S191.229,7.873,191.229,7.873H200V50H0S6.136,36.935,25,34.819,60.024,33.472,75,33.309Z"
                            transform="translate(25 77)"
                            fill="black"
                        />
                        </g>
                    </svg>
                </CardContent>
            </Card>
        </div>
    )
}