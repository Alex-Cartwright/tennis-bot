import api from "@/lib/api-client";
import { ScheduledBooking } from "../../schedule/types";
import { useQuery } from "react-query";

export const getScheduledBookings = async (): Promise<ScheduledBooking[]> => {
  const response = await api.get(`/scheduled_bookings`);
  return response.data;
};

export const useScheduledBookings = () => {
  const {
    data: scheduledBookings = [],
    isLoading,
    isError,
  } = useQuery<ScheduledBooking[], Error>({
    queryKey: "scheduledBookings",
    queryFn: getScheduledBookings,
  });
  console.log("fetching scheduled bookings");
  return { scheduledBookings, isLoading, isError}
};
