import instance from "../../../lib/axios"
import { Location } from "../types"

export const fetchLocations = async () : Promise<Location[]> => {
  const response = await instance.get("/locations")
  return response.data
}