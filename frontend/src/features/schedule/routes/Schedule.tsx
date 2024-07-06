import { Table } from "@/components/Table/table";
import { ContentLayout } from "@/components/Layout/content-layout";
import { ScheduledBooking } from "../types";
import { useScheduledBookings } from "@/features/booking/api/fetch-scheduled-bookings";

export const Schedule = () => {
  const { scheduledBookings } = useScheduledBookings();

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
        ]}
      />
    </ContentLayout>
  );
};
