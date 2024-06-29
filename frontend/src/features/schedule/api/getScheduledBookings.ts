import axios from "@/lib/axios"
import { ScheduledBooking } from "../types";

export const getScheduledBookings = async (): Promise<ScheduledBooking[]> => {
  const response = await axios.get(`/scheduled_bookings`);
  return response.data;
}