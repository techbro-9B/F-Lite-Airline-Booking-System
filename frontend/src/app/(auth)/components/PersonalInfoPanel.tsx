"use client"


import { InputField, SaveButton } from "../utils/HelperFunctions"

/*
  Profile Settings page — lets users update their personal info,
  preferences, and security settings.

  Created by Lloyd (via Claude....made the ui I handled/ implemented the logic with the db.), 21 March 2026
*/




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






