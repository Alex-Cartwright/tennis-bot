import { Table } from "@/components/Table/table";
import { ContentLayout } from "@/components/Layout/content-layout";
import { ScheduledBooking } from "../types/schedule-type";
import { useScheduledBookings } from "@/features/booking/api/fetch-scheduled-bookings";
import { Button } from "@mui/material";
import { useMakeBooking } from "../api/make-booking";
import { useCallback } from "react";

export const Schedule = () => {
  const { scheduledBookings } = useScheduledBookings();
  const { mutate: handleBooking, isLoading, isError, error } = useMakeBooking();

  return (
    <ContentLayout title="Schedule" subtitle="View Scheduled Bookings">
      <Table<ScheduledBooking>
        data={scheduledBookings}
        columns={[
          { title: "Date", field: "bookingTime" },
          {
            title: "Location",
            field: "location",
            Cell({entry: { location }}) {
              return <span>{location.name}</span>;
            },
          },
          { title: "Status", field: "status" },
          {
            title: "Manual Book",
            field: "location",
            Cell({ entry }) {
              return (
                <Button onClick={() => handleBooking(entry)}>
                  Book
                </Button>
              );
            }
          },
        ]}
      />
    </ContentLayout>
  );
};
