import { useContext } from "react"
import LocationsContext from "@/contexts/LocationsContext"

export const useLocations = () => {
  return useContext(LocationsContext)
}