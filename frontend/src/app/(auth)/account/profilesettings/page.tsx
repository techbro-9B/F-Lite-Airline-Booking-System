import { BookingsNavBar } from "@/components/BookingsNavBar";
import { SettingsLayout } from "../../components/SettingsLayout";
import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";



export default async function ProfileSettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/login")

  return (
    <>
      <BookingsNavBar />

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto">

          {/* Header Banner */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-10">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-10 text-white relative overflow-hidden">
              <div className="absolute inset-0 bg-black/10" />
              <div className="relative z-10 max-w-4xl mx-auto flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold flex-shrink-0">
                  {user.user_metadata?.full_name?.[0] ?? "U"}
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">Profile Settings</h1>
                  <p className="text-white/80 mt-1">{user.user_metadata?.full_name} · {user.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Settings Layout */}
          <SettingsLayout user={user} />

        </div>
      </div>
    </>
  )
}
 
  
