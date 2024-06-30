import api from "@/lib/api-client";
import { ScheduledBooking } from "../types";

export const getScheduledBookings = async (): Promise<ScheduledBooking[]> => {
  const response = await api.get(`/scheduled_bookings`);
  return response.data;
}