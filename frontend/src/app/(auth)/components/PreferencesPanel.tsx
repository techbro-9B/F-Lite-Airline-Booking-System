"use client"

import { useState } from "react"
import { SaveButton } from "../utils/HelperFunctions"


export function PreferencesPanel() {
  const [seatPref, setSeatPref] = useState<"window" | "middle" | "aisle">("window")
  const [mealPref, setMealPref] = useState<string>("standard")
  const [newsletter, setNewsletter] = useState(true)
  const [deals, setDeals] = useState(true)

  const seatOptions = [
    { value: "window", label: "Window", icon: "🪟" },
    { value: "middle", label: "Middle", icon: "💺" },
    { value: "aisle", label: "Aisle", icon: "🚶" },
  ]

  const mealOptions = [
    { value: "standard", label: "Standard" },
    { value: "vegetarian", label: "Vegetarian" },
    { value: "vegan", label: "Vegan" },
    { value: "halal", label: "Halal" },
    { value: "kosher", label: "Kosher" },
    { value: "gluten-free", label: "Gluten-Free" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Travel Preferences</h2>
        <p className="text-gray-500 text-sm mt-1">Set your default in-flight preferences to speed up booking.</p>
      </div>

      {/* Seat */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">Default Seat Preference</label>
        <div className="grid grid-cols-3 gap-3">
          {seatOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSeatPref(opt.value as any)}
              className={`flex flex-col items-center gap-2 py-4 px-2 rounded-xl border-2 font-medium transition-all ${
                seatPref === opt.value
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              <span className="text-2xl">{opt.icon}</span>
              <span className="text-sm">{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Meal */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">Meal Preference</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {mealOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setMealPref(opt.value)}
              className={`py-2.5 px-4 rounded-xl border-2 text-sm font-medium transition-all ${
                mealPref === opt.value
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">Notifications</label>
        <div className="space-y-3">
          {[
            { label: "Flight deals & promotions", sublabel: "Get notified about sales and discounts", state: deals, setState: setDeals },
            { label: "F-lite newsletter", sublabel: "Monthly travel tips and updates", state: newsletter, setState: setNewsletter },
          ].map(({ label, sublabel, state, setState }) => (
            <div
              key={label}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
            >
              <div>
                <p className="font-medium text-gray-900 text-sm">{label}</p>
                <p className="text-xs text-gray-500">{sublabel}</p>
              </div>
              <button
                onClick={() => setState(!state)}
                className={`relative w-11 h-6 rounded-full transition-colors ${state ? "bg-blue-600" : "bg-gray-300"}`}
              >
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${state ? "translate-x-5" : "translate-x-0"}`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <SaveButton />
      </div>
    </div>
  )
}