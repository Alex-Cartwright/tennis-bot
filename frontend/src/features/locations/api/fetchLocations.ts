import instance from "../../../lib/axios"
import { Location } from "../types"

export const fetchLocations = async () : Promise<Location[]> => {
  const response = await instance.get("/locations")
  console.log(response.data)
  return response.data
}