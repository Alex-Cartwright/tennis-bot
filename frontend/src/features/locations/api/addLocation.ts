import axios from "@/lib/axios"

export type AddLocationDTO = {
  name: string
  url: string
}

export const addLocation = async (location: AddLocationDTO) => {
  const response = await axios.post("/locations", location)
  return response.data
}