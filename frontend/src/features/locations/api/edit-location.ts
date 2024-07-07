import api from "@/lib/api-client";
import { Location } from "@/types"
import { useMutation, useQueryClient } from "react-query";

export const editLocation = async (location: Location): Promise<Location> => {
  return await api.put(`/locations/${location.id}`, {name: location.name, url: location.url});
}

export const useEditLocation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: editLocation,
    onSuccess: () => {
      console.log("Location updated")
      queryClient.invalidateQueries("locations")
    }
  })
}