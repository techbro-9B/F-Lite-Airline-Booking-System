import { createClient } from "@/lib/supabase/client"
import { getSessionData, isSessionDataSet } from "./sessionData"
import type {sessionData} from "./sessionData"
import { create } from "domain";

async function sendData() {
  console.log("ACalled")
  if (!isSessionDataSet()) {
    return;
  }
  
  try {
    const session: sessionData = await getSessionData();
    const supabase = await createClient()
    const { data, error } = await supabase
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