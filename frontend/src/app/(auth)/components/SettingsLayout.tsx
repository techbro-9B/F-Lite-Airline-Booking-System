
"use client"

// Note: Extracted as a separate client component so the page can stay async/server.
// In your project, split this into its own file: components/SettingsLayout.tsx
import { useState } from "react"
import { PersonalInfoPanel, PreferencesPanel, SectionTab, SecurityPanel } from "./ProfileSettings-Functions"

export function SettingsLayout({ user }: { user: any }) {
  const [activeTab, setActiveTab] = useState("personal")

  const sections: SettingsSection[] = [
    { id: "personal", label: "Personal Info", icon: "👤" },
    { id: "preferences", label: "Preferences", icon: "⚙️" },
    { id: "security", label: "Security", icon: "🔒" },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

      {/* Sidebar Nav */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-2xl shadow-xl p-4 space-y-1 sticky top-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest px-3 pb-2">Settings</p>
          {sections.map((s) => (
            <SectionTab
              key={s.id}
              section={s}
              active={activeTab === s.id}
              onClick={() => setActiveTab(s.id)}
            />
          ))}
        </div>
      </div>

      {/* Main Panel */}
      <div className="lg:col-span-3">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {activeTab === "personal" && <PersonalInfoPanel user={user} />}
          {activeTab === "preferences" && <PreferencesPanel />}
          {activeTab === "security" && <SecurityPanel />}
        </div>
      </div>

    </div>
  )
}
