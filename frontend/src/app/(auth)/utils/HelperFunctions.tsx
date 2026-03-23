import { SettingsSection } from "@/lib/types"
import { useState } from "react"



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