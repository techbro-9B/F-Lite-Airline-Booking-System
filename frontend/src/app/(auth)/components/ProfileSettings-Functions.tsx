"use client"

import { BookingsNavBar } from "@/components/BookingsNavBar"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { useState } from "react"

/*
  Profile Settings page — lets users update their personal info,
  preferences, and security settings.

  Created by Lloyd (via Claude), March 2026
*/


// ─── Sub-components ───────────────────────────────────────────────────────────

export function SectionTab({
  section,
  active,
  onClick,
}: {
  section: SettingsSection
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left font-medium transition-all ${
        active
          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg"
          : "text-gray-600 hover:bg-gray-50"
      }`}
    >
      <span className="text-xl">{section.icon}</span>
      <span>{section.label}</span>
    </button>
  )
}

export function InputField({
  label,
  id,
  type = "text",
  defaultValue,
  placeholder,
  disabled = false,
}: {
  label: string
  id: string
  type?: string
  defaultValue?: string
  placeholder?: string
  disabled?: boolean
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        disabled={disabled}
        className={`w-full px-4 py-3 rounded-xl border transition-all text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          disabled
            ? "bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white border-gray-200 hover:border-gray-300"
        }`}
      />
    </div>
  )
}

export function SaveButton({ label = "Save Changes" }: { label?: string }) {
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <button
      onClick={handleSave}
      className={`px-6 py-3 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl ${
        saved
          ? "bg-emerald-500 text-white"
          : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700"
      }`}
    >
      {saved ? "✓ Saved!" : label}
    </button>
  )
}

// ─── Section Panels ───────────────────────────────────────────────────────────

export function PersonalInfoPanel({ user }: { user: any }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
        <p className="text-gray-500 text-sm mt-1">Update your name, contact details, and travel documents.</p>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-3xl font-bold text-white shadow-lg flex-shrink-0">
          {user?.user_metadata?.full_name?.[0] ?? "U"}
        </div>
        <div>
          <p className="font-semibold text-gray-900">{user?.user_metadata?.full_name ?? "Your Name"}</p>
          <p className="text-sm text-gray-500 mb-3">{user?.email}</p>
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700 border border-blue-200 px-4 py-1.5 rounded-lg hover:bg-blue-50 transition-all">
            Change Photo
          </button>
        </div>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <InputField
          label="First Name"
          id="first_name"
          defaultValue={user?.user_metadata?.full_name?.split(" ")[0]}
          placeholder="First name"
        />
        <InputField
          label="Last Name"
          id="last_name"
          defaultValue={user?.user_metadata?.full_name?.split(" ").slice(1).join(" ")}
          placeholder="Last name"
        />
        <InputField
          label="Email Address"
          id="email"
          type="email"
          defaultValue={user?.email}
          disabled
        />
        <InputField
          label="Phone Number"
          id="phone"
          type="tel"
          placeholder="+1 (555) 000-0000"
        />
        <InputField
          label="Date of Birth"
          id="dob"
          type="date"
        />
        <InputField
          label="Nationality"
          id="nationality"
          placeholder="e.g. Canadian"
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="passport" className="block text-sm font-medium text-gray-700">
          Passport Number
        </label>
        <input
          id="passport"
          type="text"
          placeholder="AB 1234567"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 hover:border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        <p className="text-xs text-gray-400">Used to auto-fill travel documents. Stored securely.</p>
      </div>

      <div className="flex justify-end">
        <SaveButton />
      </div>
    </div>
  )
}

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

export function SecurityPanel() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Security</h2>
        <p className="text-gray-500 text-sm mt-1">Manage your password and account security.</p>
      </div>

      {/* Change Password */}
      <div className="p-6 border border-gray-200 rounded-2xl space-y-4">
        <h3 className="font-semibold text-gray-900">Change Password</h3>
        <InputField label="Current Password" id="current_pw" type="password" placeholder="••••••••" />
        <InputField label="New Password" id="new_pw" type="password" placeholder="••••••••" />
        <InputField label="Confirm New Password" id="confirm_pw" type="password" placeholder="••••••••" />
        <div className="flex justify-end">
          <SaveButton label="Update Password" />
        </div>
      </div>

      {/* Active Sessions */}
      <div className="p-6 border border-gray-200 rounded-2xl space-y-4">
        <h3 className="font-semibold text-gray-900">Active Sessions</h3>
        {[
          { device: "Chrome on macOS", location: "Waterloo, ON", time: "Now", current: true },
          { device: "Safari on iPhone", location: "Toronto, ON", time: "2 days ago", current: false },
        ].map(({ device, location, time, current }) => (
          <div key={device} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-lg">
                💻
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{device}</p>
                <p className="text-xs text-gray-500">{location} · {time}</p>
              </div>
            </div>
            {current ? (
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">Current</span>
            ) : (
              <button className="text-xs text-red-500 hover:text-red-700 font-medium transition-colors">
                Revoke
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Danger Zone */}
      <div className="p-6 border-2 border-red-100 bg-red-50 rounded-2xl space-y-3">
        <h3 className="font-semibold text-red-700">Danger Zone</h3>
        <p className="text-sm text-red-600">Deleting your account is permanent and cannot be undone.</p>
        <button className="px-5 py-2.5 bg-white border-2 border-red-300 text-red-600 rounded-xl text-sm font-medium hover:bg-red-600 hover:text-white transition-all">
          Delete Account
        </button>
      </div>
    </div>
  )
}




