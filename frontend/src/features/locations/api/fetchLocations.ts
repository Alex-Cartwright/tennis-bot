import axios from "@/lib/axios"
import { Location } from "@/types"

export const fetchLocations = async () : Promise<Location[]> => {
  const response = await axios.get("/locations")
  return response.data
}