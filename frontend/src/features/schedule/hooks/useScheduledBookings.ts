import { useEffect, useState } from "react";
import { ScheduledBooking } from "../types";
import { getScheduledBookings } from "../api/getScheduledBookings";

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