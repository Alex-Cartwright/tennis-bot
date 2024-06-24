import instance from "../../../lib/axios"
import { Location } from "../types"

export const addLocation = async (location: Location) => {
  const response = await instance.post("/locations", location)
  return response.data
}