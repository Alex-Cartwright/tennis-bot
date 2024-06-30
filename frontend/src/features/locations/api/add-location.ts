import api from "@/lib/api-client"
import { LocationDTO } from "../types"
import { useMutation, useQueryClient } from "react-query"

const addLocation = async (location: LocationDTO) => {
  const response = await api.post("/locations", location)
  return response.data
}

export const useAddLocation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addLocation,
    onSuccess: () => {
      console.log("Location added")
      queryClient.invalidateQueries("locations")
    }
  })
} 