import api from "@/lib/api-client";
import { useMutation, useQueryClient } from "react-query";

export const deleteLocation = async (id: string) => {
  return await api.delete(`/locations/${id}`);
}

export const useDeleteLocation = () => {
  const queryClient = useQueryClient()
  return useMutation(deleteLocation, {
    onSuccess: () => {
      console.log("Location deleted")
      queryClient.invalidateQueries("locations")
    }
  })
}