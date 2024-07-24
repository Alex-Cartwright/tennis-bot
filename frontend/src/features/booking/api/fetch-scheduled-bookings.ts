import api from "@/lib/api-client";
import { ScheduledBooking } from "../../schedule/types/schedule-type";
import { useQuery } from "react-query";

export const getScheduledBookings = async (): Promise<ScheduledBooking[]> => {
  return await api.get(`/bookings`);
};

export const useScheduledBookings = () => {
  console.log("fetching scheduled bookings");
  const {
    data: scheduledBookings = [],
    isLoading,
    isError,
  } = useQuery<ScheduledBooking[], Error>({
    queryKey: "scheduledBookings",
    queryFn: getScheduledBookings,
  });
  return { scheduledBookings, isLoading, isError}
};
