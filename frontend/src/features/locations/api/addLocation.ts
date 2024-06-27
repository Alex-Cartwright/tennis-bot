import axios from "@/lib/axios"
import { LocationDTO } from "../types"

export const addLocation = async (location: LocationDTO) => {
  const response = await axios.post("/locations", location)
  return response.data
}