import api from "@/lib/api-client"
import { useMutation, useQueryClient } from "react-query"
import { BookingDTO } from "../types/types"

export const requestBooking = async (booking: BookingDTO) => {
  const response = await api.post("/scheduled_bookings", booking)
  return response.data
}

export const useRequestBooking = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: requestBooking,
    onSuccess: () => {
      console.log("Booking requested")
      queryClient.invalidateQueries("bookings")
    },
    onError: (error) => {
      console.error("Error requesting booking", error)
    }
  })
}