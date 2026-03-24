import { BookingsNavBar } from "@/components/BookingsNavBar"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { FlightHistoryContent } from "../../components/History-Functions"



export default async function FlightHistoryPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
 
  if (!user) redirect("/login")
 
  return (
    <>
      <BookingsNavBar />
      <FlightHistoryContent user={user} />
    </>
  )
}