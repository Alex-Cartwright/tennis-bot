import api from "@/lib/api-client"
import { LocationDTO } from "../types/location-types"
import { useMutation, useQueryClient } from "react-query"

const addLocation = async (location: LocationDTO) => {
  return await api.post("/locations", location)
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