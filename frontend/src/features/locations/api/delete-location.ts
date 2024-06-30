import axios from "@/lib/axios";
import { useMutation, useQueryClient } from "react-query";

export const deleteLocation = async (id: string) => {
  await axios.delete(`/locations/${id}`);
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