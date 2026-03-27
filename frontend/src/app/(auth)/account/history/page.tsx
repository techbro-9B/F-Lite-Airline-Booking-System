import { BookingsNavBar } from "@/components/BookingsNavBar"
import { createClient } from "@/lib/supabase/server"
import { redirect} from "next/navigation"
//import { FlightHistoryContent } from "../../components/History-Functions"
import { getUserProfile } from "@/lib/UserQueries"



export default async function FlightHistoryPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect("/login")
  }
  const {user_profile, error} = await getUserProfile(user.id)
  if (error) throw error
  console.log(user_profile)
  
  if (!user) redirect("/login")
  console.log(user_profile)
  console.log(user_profile.f_name)
  return (
    <>
      <BookingsNavBar />
      
    </>
  )
}