import { Table } from "@/components/Table/Table";
import { ContentLayout } from "../../../components/Layout";
import { useScheduledBookings } from "../hooks/useScheduledBookings";
import { ScheduledBooking } from "../types";

export const Schedule = () => {
  const { scheduledBookings } = useScheduledBookings();

  return (
    <ContentLayout title="Schedule" subtitle="View Scheduled Bookings">
      <Table<ScheduledBooking>
        data={scheduledBookings}
        columns={[
          { title: "ID", field: "id" },
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
