import instance from "@/lib/axios"
import { Location } from "@/types"
import { useMutation, useQueryClient } from "react-query";

export const editLocation = async (location: Location): Promise<Location> => {
  const response = await instance.put(`/locations/${location.id}`, {name: location.name, url: location.url});
  return response.data;
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