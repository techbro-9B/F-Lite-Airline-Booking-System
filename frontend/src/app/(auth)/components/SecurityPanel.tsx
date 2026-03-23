"use client"

import { InputField, SaveButton } from "../utils/HelperFunctions"

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
