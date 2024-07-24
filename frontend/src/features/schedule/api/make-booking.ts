import api from "@/lib/api-client"
import { useMutation } from "react-query"

const makeBooking = async (booking) => {
  console.log("Making booking request:", booking);
  return await api.post("/web/book", booking)
}

export const useMakeBooking = () => {
  const mutation = useMutation(makeBooking, {
    onSuccess: () => {
      console.log("Booking request successfully sent.");
    },
    onError: (error) => {
      // Handle errors here if needed
      console.error('Error making booking:', error);
    },
    // You can also specify onSettled if you want to do something when the mutation is either successful or an error occurred
  });

  return mutation;
}