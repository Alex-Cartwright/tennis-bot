import { useState } from "react";
import { ScheduledBooking } from "../types";

export const useScheduledBookings = () => {
  const [scheduledBookings, setScheduledBookings] = useState<ScheduledBooking[]>([]);

  return {
    scheduledBookings,
    setScheduledBookings,
  }
}