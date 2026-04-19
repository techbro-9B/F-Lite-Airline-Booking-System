import { createClient } from "@/lib/supabase/client"
import { getSessionData, isSessionDataSet } from "./sessionData"
import type {sessionData} from "./sessionData"

var canSend = true

async function sendData() {
  console.log("ACalled")
  if (!isSessionDataSet() || !canSend) {
    return;
  }

  canSend = false
  setTimeout(()=>{
    canSend = true;
  }, 100)
  
  try {
    const session: sessionData = await getSessionData();
    const supabase = await createClient()
    console.log(session.uuid)
    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          flight_id: session.flightId,
          seats_booked: session.seatsBooked,
          user_id: session.uuid,
          total_price: session.total_price,
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