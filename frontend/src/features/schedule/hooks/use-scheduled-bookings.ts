import { useEffect, useState } from "react";
import { ScheduledBooking } from "../types";
import { getScheduledBookings } from "../../booking/api/get-scheduled-bookings";

export const useScheduledBookings = () => {
  const [scheduledBookings, setScheduledBookings] = useState<ScheduledBooking[]>([]);

  useEffect(() => {
    getScheduledBookings().then(setScheduledBookings);
  }, []);

  return {
    scheduledBookings,
    setScheduledBookings,
  }
}