/* 
Types for the rest of the application
*/



export const STATUS_CONFIG: Record<FlightStatus, { label: string; bg: string; text: string; dot: string }> = {
  upcoming: {
    label: "Upcoming",
    bg: "bg-blue-100",
    text: "text-blue-700",
    dot: "bg-blue-500",
  },
  completed: {
    label: "Completed",
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  cancelled: {
    label: "Cancelled",
    bg: "bg-red-100",
    text: "text-red-600",
    dot: "bg-red-400",
  },
}


/// Temporary types for the history...
export type FlightStatus = "upcoming" | "completed" | "cancelled"
 
export interface Flight {
  id: string
  flightNumber: string
  origin: string
  originCode: string
  destination: string
  destinationCode: string
  departureDate: string
  departureTime: string
  arrivalTime: string
  duration: string
  status: FlightStatus
  seat: string
  class: string
  gate?: string
  aircraft: string
  price: string
}

// used for the user settings
export interface SettingsSection {
  id: string
  label: string
  icon: string
}


interface UserProfile {

    username: string,
    email: string
    f_name?: string,
    l_name?: string,
    phone?: string,
}