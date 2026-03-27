"use client"
/* 
Functions for the history page.

Created by Lloyd, March 21, 2026
updated: Lloyd, March 21, 2026
*/


import { useState } from "react";
import { MOCK_FLIGHTS } from "@/lib/mock_data";
import { Flight, FlightStatus, STATUS_CONFIG } from "@/lib/types";
import Link from "next/link";

export function FlightCard({ flight, onClick }: { flight: Flight; onClick: () => void }) {
  const status = STATUS_CONFIG[flight.status]
 
  return (
    <button
      onClick={onClick}
      className="w-full text-left group"
    >
      <div
        className={`relative p-6 bg-white rounded-2xl border-2 transition-all hover:shadow-lg hover:-translate-y-0.5 ${
          flight.status === "cancelled"
            ? "border-gray-100 opacity-70"
            : "border-gray-100 hover:border-blue-200"
        }`}
      >
        {/* Top row */}
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                flight.status === "cancelled"
                  ? "bg-gray-100"
                  : "bg-gradient-to-br from-blue-500 to-indigo-600"
              }`}
            >
              {flight.status === "cancelled" ? "🚫" : "✈️"}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                {flight.flightNumber}
              </p>
              <p className="text-sm font-medium text-gray-700">{flight.aircraft}</p>
            </div>
          </div>
 
          {/* Status badge */}
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${status.bg} ${status.text}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            {status.label}
          </span>
        </div>
 
        {/* Route */}
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900 tracking-tight">{flight.originCode}</p>
            <p className="text-xs text-gray-500 mt-0.5">{flight.origin}</p>
            <p className="text-sm font-semibold text-gray-700 mt-1">{flight.departureTime}</p>
          </div>
 
          <div className="flex-1 flex flex-col items-center gap-1">
            <p className="text-xs text-gray-400">{flight.duration}</p>
            <div className="w-full flex items-center gap-1">
              <div className="w-2 h-2 rounded-full border-2 border-gray-300" />
              <div className="flex-1 h-px bg-gradient-to-r from-gray-300 via-blue-300 to-gray-300" />
              <div className="text-gray-400">›</div>
              <div className="w-2 h-2 rounded-full border-2 border-gray-300" />
            </div>
            <p className="text-xs text-gray-400">{flight.class}</p>
          </div>
 
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-900 tracking-tight">{flight.destinationCode}</p>
            <p className="text-xs text-gray-500 mt-0.5">{flight.destination}</p>
            <p className="text-sm font-semibold text-gray-700 mt-1">{flight.arrivalTime}</p>
          </div>
        </div>
 
        {/* Bottom row */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>📅 {flight.departureDate}</span>
            <span>💺 Seat {flight.seat}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">{flight.price}</span>
            <span className="text-gray-400 text-sm group-hover:translate-x-0.5 transition-transform">›</span>
          </div>
        </div>
      </div>
    </button>
  )
}
 

 
export function FlightDetailDrawer({
  flight,
  onClose,
}: {
  flight: Flight | null
  onClose: () => void
}) {
  if (!flight) return null
  const status = STATUS_CONFIG[flight.status]
 
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
        onClick={onClose}
      />
 
      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-8 text-white">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-sm font-semibold opacity-70 uppercase tracking-widest mb-1">
                {flight.flightNumber}
              </p>
              <h2 className="text-2xl font-bold">Flight Details</h2>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              ✕
            </button>
          </div>
 
          {/* Route in drawer */}
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-4xl font-bold tracking-tight">{flight.originCode}</p>
              <p className="text-sm opacity-80">{flight.origin}</p>
            </div>
            <div className="flex-1 flex flex-col items-center gap-1">
              <p className="text-xs opacity-70">{flight.duration}</p>
              <div className="w-full flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-white/60" />
                <div className="flex-1 h-px bg-white/40" />
                <span className="text-white/80 text-sm">✈</span>
                <div className="flex-1 h-px bg-white/40" />
                <div className="w-2 h-2 rounded-full bg-white/60" />
              </div>
              <p className="text-xs opacity-70">Direct</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold tracking-tight">{flight.destinationCode}</p>
              <p className="text-sm opacity-80">{flight.destination}</p>
            </div>
          </div>
        </div>
 
        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Status */}
          <span
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold ${status.bg} ${status.text}`}
          >
            <span className={`w-2 h-2 rounded-full ${status.dot}`} />
            {status.label}
          </span>
 
          {/* Info grid */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Date", value: flight.departureDate, icon: "📅" },
              { label: "Aircraft", value: flight.aircraft, icon: "✈️" },
              { label: "Departure", value: flight.departureTime, icon: "🛫" },
              { label: "Arrival", value: flight.arrivalTime, icon: "🛬" },
              { label: "Seat", value: flight.seat, icon: "💺" },
              { label: "Class", value: flight.class, icon: "🎫" },
              ...(flight.gate ? [{ label: "Gate", value: flight.gate, icon: "🚪" }] : []),
              { label: "Total Paid", value: flight.price, icon: "💳" },
            ].map(({ label, value, icon }) => (
              <div key={label} className="p-4 bg-gray-50 rounded-xl">
                <p className="text-xs text-gray-500 mb-1">
                  {icon} {label}
                </p>
                <p className="font-semibold text-gray-900">{value}</p>
              </div>
            ))}
          </div>
 
          {/* Actions */}
          {flight.status === "upcoming" && (
            <div className="space-y-3 pt-2">
              <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl">
                View Boarding Pass 🎫
              </button>
              <button className="w-full border-2 border-gray-200 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-50 transition-all">
                Manage Booking
              </button>
              <button className="w-full border-2 border-red-100 text-red-500 py-3 px-6 rounded-xl font-medium hover:bg-red-50 transition-all">
                Cancel Flight
              </button>
            </div>
          )}
 
          {flight.status === "completed" && (
            <div className="space-y-3 pt-2">
              <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-medium hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg">
                Book Again ✈️
              </button>
              <button className="w-full border-2 border-gray-200 text-gray-700 py-3 px-6 rounded-xl font-medium hover:bg-gray-50 transition-all">
                Download Receipt
              </button>
            </div>
          )}
 
          {flight.status === "cancelled" && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
              <p className="text-sm text-red-600 font-medium">This flight was cancelled.</p>
              <p className="text-xs text-red-400 mt-1">Refunds are processed within 5–7 business days.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
 
// ─── Filter Tabs ──────────────────────────────────────────────────────────────
 
export function FilterTabs({
  active,
  onChange,
  counts,
}: {
  active: FlightStatus | "all"
  onChange: (v: FlightStatus | "all") => void
  counts: Record<string, number>
}) {
  const tabs: { value: FlightStatus | "all"; label: string }[] = [
    { value: "all", label: "All Flights" },
    { value: "upcoming", label: "Upcoming" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ]
 
  return (
    <div className="flex gap-2 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          onClick={() => onChange(tab.value)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            active === tab.value
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
              : "bg-white text-gray-600 border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
          }`}
        >
          {tab.label}
          <span
            className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
              active === tab.value ? "bg-white/25 text-white" : "bg-gray-100 text-gray-500"
            }`}
          >
            {counts[tab.value] ?? 0}
          </span>
        </button>
      ))}
    </div>
  )
}
 
// ─── Stats Bar ────────────────────────────────────────────────────────────────
 
export function StatsBar({ flights }: { flights: Flight[] }) {
  const completed = flights.filter((f) => f.status === "completed")
  const totalSpend = flights
    .filter((f) => f.status !== "cancelled")
    .reduce((sum, f) => sum + parseFloat(f.price.replace(/[$,]/g, "")), 0)
 
  const destinations = new Set(flights.map((f) => f.destinationCode)).size
 
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {[
        { label: "Total Flights", value: flights.length, icon: "✈️", color: "from-blue-50 to-indigo-50" },
        { label: "Completed", value: completed.length, icon: "✅", color: "from-emerald-50 to-teal-50" },
        { label: "Destinations", value: destinations, icon: "🌍", color: "from-orange-50 to-amber-50" },
        {
          label: "Total Spent",
          value: `$${totalSpend.toLocaleString("en-CA", { minimumFractionDigits: 0 })}`,
          icon: "💳",
          color: "from-purple-50 to-pink-50",
        },
      ].map(({ label, value, icon, color }) => (
        <div key={label} className={`p-5 bg-gradient-to-r ${color} rounded-2xl`}>
          <div className="text-2xl mb-2">{icon}</div>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-xs text-gray-500 mt-0.5">{label}</p>
        </div>
      ))}
    </div>
  )
}
 
// Main Client Component 
 
export function FlightHistoryContent({ user }: { user: any }) {
  const [filter, setFilter] = useState<FlightStatus | "all">("all")
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null)
  const [search, setSearch] = useState("")
 
  const filtered = MOCK_FLIGHTS.filter((f) => {
    const matchesFilter = filter === "all" || f.status === filter
    const matchesSearch =
      search === "" ||
      f.destination.toLowerCase().includes(search.toLowerCase()) ||
      f.origin.toLowerCase().includes(search.toLowerCase()) ||
      f.flightNumber.toLowerCase().includes(search.toLowerCase()) ||
      f.destinationCode.toLowerCase().includes(search.toLowerCase()) ||
      f.originCode.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })
 
  const counts = {
    all: MOCK_FLIGHTS.length,
    upcoming: MOCK_FLIGHTS.filter((f) => f.status === "upcoming").length,
    completed: MOCK_FLIGHTS.filter((f) => f.status === "completed").length,
    cancelled: MOCK_FLIGHTS.filter((f) => f.status === "cancelled").length,
  }
 
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
 
        {/* Header Banner */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-10 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10" />
            <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                  {user?.user_metadata?.full_name?.[0] ?? "U"}
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">Flight History</h1>
                  <p className="text-white/80 mt-1">{user?.user_metadata?.full_name}</p>
                </div>
              </div>
              <Link href={"/"}>
                <button className="self-start sm:self-auto bg-white text-blue-700 font-semibold px-5 py-2.5 rounded-xl hover:bg-blue-50 transition-all shadow-lg text-sm">
                  Book New Flight ✈️
                </button>
              </Link>
            </div>
          </div>
        </div>
 
        {/* Stats */}
        <StatsBar flights={MOCK_FLIGHTS} />
 
        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
          {/* Search */}
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by destination, origin, or flight number…"
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400 transition-all"
            />
          </div>
 
          {/* Filter tabs */}
          <FilterTabs active={filter} onChange={setFilter} counts={counts} />
        </div>
 
        {/* Flight List */}
        <div className="space-y-4">
          {filtered.length > 0 ? (
            filtered.map((flight) => (
              <FlightCard
                key={flight.id}
                flight={flight}
                onClick={() => setSelectedFlight(flight)}
              />
            ))
          ) : (
            <div className="bg-white rounded-2xl shadow-xl p-16 text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center text-4xl">
                ✈️
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No flights found</h3>
              <p className="text-gray-500 text-sm">
                {search ? `No results for "${search}"` : "No flights in this category yet."}
              </p>
            </div>
          )}
        </div>
      </div>
 
      {/* Detail Drawer */}
      <FlightDetailDrawer
        flight={selectedFlight}
        onClose={() => setSelectedFlight(null)}
      />
    </div>
  )
}