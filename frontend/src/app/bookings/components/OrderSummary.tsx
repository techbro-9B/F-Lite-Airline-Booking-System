import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PlaneTakeoff, Calendar } from "lucide-react";
import { getSessionData } from "@/app/paymentGate/sessionData";
import { sessionData } from "@/app/paymentGate/sessionData";
import { getFlightData, getDestinationData, getPlaneData } from "@/lib/flightQuery";
import { useEffect, useState } from "react";

function formatDate(date: Date) {
  const datePart = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const timePart = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return `${datePart} • ${timePart}`;
}

export default function OrderSummary() {

    const [checkoutData, setCheckoutData] = useState<{
        destCode?: string,
        destName?: string,
        originCode?: string,
        originName?: string,
        baseFare?: number,
        seats?: number,
        fees?: number,
        fareAfterFees?: number,
        departString?: string,
    }>({})

    useEffect(() => {
        async function loadData() {
            const sessionData: sessionData = getSessionData();
            const flightData = await getFlightData(sessionData.flightId);
            const originData = await getDestinationData(flightData.origin_id);
            const destData = await getDestinationData(flightData.destination_id)

            setCheckoutData({
                destCode: destData.airport_code,
                destName: destData.name,
                originCode: originData.airport_code,
                originName: originData.name,
                baseFare: flightData.cost * sessionData.seatsBooked,
                seats: sessionData.seatsBooked,
                fees: 120.50,
                fareAfterFees: flightData.cost * sessionData.seatsBooked + 120.50,
                departString: formatDate(flightData.departureDate),
            })
        }
        loadData()
    }, [])

    return (
        <Card className="w-full">
            <CardHeader className="bg-muted/50 pb-6">
                <CardTitle className="text-xl">Order Summary</CardTitle>
            </CardHeader>

            <CardContent className="pt-6 space-y-6">
                {/* Mock Flight Details */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <span className="text-2xl font-bold">{checkoutData.originCode}</span>
                            <span className="text-sm text-muted-foreground">{checkoutData.originName}</span>
                        </div>
                        <div className="flex flex-col items-center px-4">
                            <span className="text-xs text-muted-foreground mb-1">21h 15m</span>
                            <div className="flex items-center w-full">
                                <div className="h-[2px] w-8 bg-border"></div>
                                <PlaneTakeoff className="h-4 w-4 mx-2 text-primary" />
                                <div className="h-[2px] w-8 bg-border"></div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <span className="text-2xl font-bold">{checkoutData.destCode}</span>
                            <span className="text-sm text-muted-foreground">{checkoutData.destName}</span>
                        </div>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground pt-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{checkoutData.departString}</span>
                    </div>
                </div>

                <Separator />

                {/* Dynamic Pricing Breakdown */}
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span>Base Fare for {checkoutData.seats} seat(s)</span>
                        <span>${checkoutData.baseFare?.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                        <span>Taxes & Fees</span>
                        <span>${checkoutData.fees?.toFixed(2)}</span>
                    </div>
                </div>
            </CardContent>

            <Separator />

            <CardFooter className="pt-6 flex justify-between items-center">
                <div className="flex flex-col">
                    <span className="text-base font-semibold">Total</span>
                    <span className="text-xs text-muted-foreground">Including taxes</span>
                </div>
                <span className="text-2xl font-bold">${checkoutData.fareAfterFees?.toFixed(2)}</span>
            </CardFooter>
        </Card>
    );
}