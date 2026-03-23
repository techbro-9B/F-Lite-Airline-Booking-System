'use client'

import { supabaseClientSide as supabase } from '@/lib/supabase/client'
import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SeatSelectionPage() {
  const params = useSearchParams()
  const router = useRouter()

  const flightId = params.get('flightId')
  const available = parseInt(params.get('available') || '0')
  const cost = parseFloat(params.get('cost') || '0')

  const [seats, setSeats] = useState(1)
  const [loading, setLoading] = useState(false)
  const [confirmed, setConfirmed] = useState(false)
  const [error, setError] = useState('')

  const handleBooking = async () => {
    setLoading(true)
    setError('')

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      setError('You must be logged in to book.')
      setLoading(false)
      return
    }

    const { error: bookingError } = await supabase
      .from('user_flight_bookings')
      .insert({
        flight_id: flightId,
        uuid: user.id,
        seats_booked: seats,
      })

    if (bookingError) {
      setError('Booking failed: ' + bookingError.message)
      setLoading(false)
      return
    }

    const { error: updateError } = await supabase
      .from('flights')
      .update({ reserved_seats: available - seats })
      .eq('flight_id', flightId)

    if (updateError) {
      setError('Booking saved but seat count failed to update.')
    }

    setConfirmed(true)
    setLoading(false)
  }

  if (confirmed) {
    return (
      <main className="p-8 max-w-md mx-auto text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Booking Confirmed! ✅</h1>
        <p className="text-gray-600 mb-6">You booked {seats} seat(s) on flight #{flightId}.</p>
        <button
          onClick={() => router.push('/bookings')}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Back to Flights
        </button>
      </main>
    )
  }

  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-1">Select Seats</h1>
      <p className="text-gray-500 mb-8">Flight #{flightId} — {available} seats available</p>

      <div className="flex items-center justify-center gap-6 mb-8">
        <button
          onClick={() => setSeats(s => Math.max(1, s - 1))}
          className="w-12 h-12 rounded-full border-2 text-2xl font-bold hover:bg-gray-100"
        >
          −
        </button>
        <span className="text-5xl font-bold w-12 text-center">{seats}</span>
        <button
          onClick={() => setSeats(s => Math.min(available, s + 1))}
          className="w-12 h-12 rounded-full border-2 text-2xl font-bold hover:bg-gray-100"
        >
          +
        </button>
      </div>

      <div className="bg-gray-50 rounded-xl p-4 mb-8">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>${cost.toFixed(2)} × {seats} seat(s)</span>
          <span>${(cost * seats).toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-lg border-t pt-2">
          <span>Total</span>
          <span>${(cost * seats).toFixed(2)}</span>
        </div>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <button
        onClick={handleBooking}
        disabled={loading || available === 0}
        className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold text-lg hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? 'Confirming...' : `Confirm — ${seats} seat(s) · $${(cost * seats).toFixed(2)}`}
      </button>

      <button
        onClick={() => router.back()}
        className="w-full mt-3 py-3 rounded-xl text-gray-500 hover:bg-gray-100"
      >
        Go Back
      </button>
    </main>
  )
}