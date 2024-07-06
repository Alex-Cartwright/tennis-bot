import { Location } from "@/types";

export type ScheduledBooking = {
  id: string;
  bookingTime: string;
  location: Location;
  status: BookingStatus;
};

export enum BookingStatus {
  PENDING,
  CONFIRMED,
  CANCELLED,
  FAILED
}