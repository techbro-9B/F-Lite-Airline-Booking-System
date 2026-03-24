"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import CheckoutForm from "../components/CheckoutForm";
import OrderSummary from "../components/OrderSummary";
import { BookingsNavBar } from "@/components/BookingsNavBar";
export const checkoutSchema = z.object({
    fullName: z.string().min(2, "Name is required"),
    email: z.string().email({ message: "Invalid email address" }),
    cardNumber: z.string().min(16, "Card number is required"),
    expiry: z.string().min(4, "Expiry date is required"),
    cvc: z.string().min(3, "CVC is required"),
});

// 1. Create a sub-component that actually handles the URL and Form logic
function CheckoutContent() {
    // Grab the URL parameters directly on the client
    const searchParams = useSearchParams();
    const seatsParam = searchParams.get("seats");
    const seatCount = parseInt(seatsParam || "1") || 1;

    const form = useForm<z.infer<typeof checkoutSchema>>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            fullName: "",
            email: "",
            cardNumber: "",
            expiry: "",
            cvc: "",
        },
    });

    function onSubmit(values: z.infer<typeof checkoutSchema>) {
        const finalBookingData = {
            ...values,
            seatsBooked: seatCount,
        };
        console.log("Ready to send to Supabase:", finalBookingData);
    }

    return (
        <>
            <BookingsNavBar/>
            <div className="container mx-auto p-4 md:p-8 max-w-6xl">
            
                <h1 className="text-3xl font-bold mb-8">Complete Your Booking</h1>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        <div className="lg:col-span-8 space-y-6">
                            <CheckoutForm />
                        </div>

                        <div className="lg:col-span-4">
                            <div className="sticky top-8">
                                <OrderSummary/>
                            </div>
                        </div>

                    </form>
                </Form>
            </div>
        </>
    );
}

// 2. The main page export simply wraps the content in a Suspense boundary
export default function CheckoutPage() {
    return (
        // This fallback will show on the server, perfectly matching the initial client HTML
        <Suspense
            fallback={
                <div className="container mx-auto p-8 flex justify-center min-h-[50vh] items-center text-muted-foreground">
                    Loading secure checkout...
                </div>
            }
        >
            <CheckoutContent />
        </Suspense>
    );
}