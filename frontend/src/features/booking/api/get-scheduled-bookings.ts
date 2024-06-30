import api from "@/lib/api-client";
import { ScheduledBooking } from "../../schedule/types";
import { useQuery } from "react-query";

export const getScheduledBookings = async (): Promise<ScheduledBooking[]> => {
  const response = await api.get(`/scheduled_bookings`);
  return response.data;
};

export const useScheduledBookings = () => {
  return useQuery<ScheduledBooking[], Error>({
    queryKey: "scheduledBookings",
    queryFn: getScheduledBookings,
  });
};
