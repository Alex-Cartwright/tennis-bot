import api from "@/lib/api-client"
import { useMutation, useQueryClient } from "react-query"
import { BookingDTO } from "../types/booking-types"

export const requestBooking = async (booking: BookingDTO) => {
  return await api.post("/bookings", booking)
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