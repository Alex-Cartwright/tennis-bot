import { ContentLayout } from "../../../components/Layout"
import { useScheduledBookings } from "../hooks/useScheduledBookings";

export const Schedule = () => {
  const { scheduledBookings } = useScheduledBookings();
  return (
    <ContentLayout title="Schedule" subtitle="View Scheduled Bookings">
      <>
        {scheduledBookings.map((booking, index) => (
          <div key={index}>
            <p>{booking.date}</p>
            <p>{booking.location}</p>
            <p>{booking.user}</p>
          </div>
        ))}
      </>
    </ContentLayout>
  )
}