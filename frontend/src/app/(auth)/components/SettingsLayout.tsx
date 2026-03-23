"use client"

// Note: Extracted as a separate client component so the page can stay async/server.
// In your project, split this into its own file: components/SettingsLayout.tsx
import { useState } from "react"
import { PersonalInfoPanel } from "./PersonalInfoPanel"
import { SettingsSection } from "@/lib/types"
import { SecurityPanel } from "./SecurityPanel"
import { PreferencesPanel } from "./PreferencesPanel"


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

function SectionTab({
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
