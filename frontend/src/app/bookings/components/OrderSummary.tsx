import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PlaneTakeoff, Calendar } from "lucide-react";

interface OrderSummaryProps {
    seatCount: number;
}

export default function OrderSummary({ seatCount }: OrderSummaryProps) {
    // Pricing math based on the prop
    const basePricePerSeat = 950.00;
    const taxesAndFeesPerSeat = 120.50;

    const subtotal = basePricePerSeat * seatCount;
    const totalTaxes = taxesAndFeesPerSeat * seatCount;
    const grandTotal = subtotal + totalTaxes;

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
                            <span className="text-2xl font-bold">YYZ</span>
                            <span className="text-sm text-muted-foreground">Toronto</span>
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
                            <span className="text-2xl font-bold">SIN</span>
                            <span className="text-sm text-muted-foreground">Singapore</span>
                        </div>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground pt-2">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>Thu, Oct 15 • 10:30 AM Departure</span>
                    </div>
                </div>

                <Separator />

                {/* Dynamic Pricing Breakdown */}
                <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span>Base Fare ({seatCount} {seatCount === 1 ? 'Traveller' : 'Travellers'})</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                        <span>Taxes & Fees</span>
                        <span>${totalTaxes.toFixed(2)}</span>
                    </div>
                </div>
            </CardContent>

            <Separator />

            <CardFooter className="pt-6 flex justify-between items-center">
                <div className="flex flex-col">
                    <span className="text-base font-semibold">Total</span>
                    <span className="text-xs text-muted-foreground">Including taxes</span>
                </div>
                <span className="text-2xl font-bold">${grandTotal.toFixed(2)}</span>
            </CardFooter>
        </Card>
    );
}