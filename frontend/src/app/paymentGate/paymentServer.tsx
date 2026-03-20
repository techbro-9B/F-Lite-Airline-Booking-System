import { supabaseClientSide } from "@/lib/supabase/client"
import { getSessionData, isSessionDataSet } from "./sessionData"
import type {sessionData} from "./sessionData"

async function sendData() {
  console.log("ACalled")
  if (!isSessionDataSet()) {
    return;
  }
  
  try {
    const session: sessionData = await getSessionData();

    const { data, error } = await supabaseClientSide
      .from("user_flight_bookings")
      .insert([
        {
          flight_id: session.flightId,
          seats_booked: session.seatsBooked,
          uuid: session.uuid,
        },
      ]);
    console.log("Complete")
    if (error) {
      console.error("Supabase insert error:", error);
    } else {
      console.log("Data inserted successfully:", data);
    }
  } catch (err) {
    console.error("sendData failed:", err);
  }
}

export {sendData}