
import { BookingsNavBar } from "@/components/BookingsNavBar"
import { createClient } from "@/lib/supabase/server"

import { redirect } from "next/navigation"



/* 
Basic ui user's account.
needs to be cleaned up... alot of junk!⚠️⚠️⚠️

Created by Lloyd, march 3, 2026
updated: Lloyd, march 3, 2026 
*/
export default async function UserAccountPage() {
  

  let user;
  try{
    const supabase = await createClient() // searches if the user's JWT are in the cookies
    const {data:{user:fetchedUser}} = await supabase.auth.getUser()

    if(!fetchedUser) redirect("/login")
      user = fetchedUser
    //Getting the user's profile from public.profiles in the db!


  } catch (error){
    redirect("/error")
  }
   let slogan = "Frequent flyer exploring new destinations"

  return (
    <>
    <BookingsNavBar/>
    
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className=" mx-auto">
        {/* Hero Section */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center">
                {/* Avatar placeholder */}
                <div className="w-20 h-20 rounded-full bg-white/30 flex items-center justify-center text-3xl font-bold">
                  U
                </div>
              </div>
              {/* add the acc user's name here!! */}
              <h1 className="text-4xl md:text-5xl font-bold mb-3">{user.user_metadata.full_name}</h1>
              <p className="text-xl opacity-90 mb-2">{user.email}</p>
              <p className="text-lg max-w-2xl mx-auto opacity-95">
                {slogan}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Stats & Actions */}
          <div className="lg:col-span-1 space-y-6">
            {/* Stats Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Flights Booked</p>
                    <p className="text-3xl font-bold text-gray-900">12</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    ✈️
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
                  <p className="text-sm font-medium text-gray-600 mb-1">Recent Flight</p>
                  <p className="font-semibold text-gray-900">Tokyo, Japan</p>
                  <p className="text-xs text-gray-500">Feb 15, 2026</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h4>
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl">
                  Book New Flight ✈️
                </button>
                <button className="w-full border border-gray-200 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-50 transition-all">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Flights Section */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-6 text-white">
                <h2 className="text-2xl font-bold">Flight History</h2>
              </div>
              <div className="p-8 space-y-4">
                {/* Flight Card */}
                <div className="flex items-center p-6 bg-gray-50 rounded-xl hover:bg-white transition-all border-l-4 border-blue-500">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-2xl mr-6">
                    ✈️
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-xl text-gray-900 truncate">Tokyo Narita (NRT)</h4>
                    <p className="text-sm text-gray-600 mb-1">FL-1234</p>
                    <p className="text-sm text-gray-500">Feb 15, 2026 • Confirmed</p>
                  </div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium ml-6">
                    ACTIVE
                  </span>
                </div>
                
                {/* Empty State Alternative */}
                {/* 
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    ✈️
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">No flights yet</h3>
                  <p className="text-gray-600 mb-6">Book your first flight!</p>
                  <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-blue-700">
                    Book Flight
                  </button>
                </div>
                */}
              </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center p-3 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    👤
                  </div>
                  <span>Profile updated Feb 28, 2026</span>
                </div>
                <div className="flex items-center p-3 bg-emerald-50 rounded-xl">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                    ✈️
                  </div>
                  <span>Booked flight to Tokyo</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}