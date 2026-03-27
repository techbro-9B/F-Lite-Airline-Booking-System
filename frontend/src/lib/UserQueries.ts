'use server'

import { createClient } from "./supabase/server"

const supabase = await createClient()

export async function getUserBookingData(user_id: string) {
  const { count, data: user_bookings, error } = await supabase
    .from('booking_flight_details')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user_id)

  return { count, user_bookings, error }
}

export async function getUserRecentBookings(user_id: string, amount: number) {
  const { data: bookings, error: bookingsError } = await supabase
    .from('booking_flight_details')
    .select('*')
    .eq('user_id', user_id)
    .order('departure_date', { ascending: false })
    .limit(amount)

  if (bookingsError) throw bookingsError
  return { bookings, bookingsError }
}

export async function getUserProfile(user_id: string) {
  const { data: user_profile, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('uuid', user_id).single()

  if (error) throw error
  return {user_profile, error }
}







