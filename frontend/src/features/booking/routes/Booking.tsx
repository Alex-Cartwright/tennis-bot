import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useFetchLocations } from "@/features/locations/api/fetch-locations";
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import { useNavigate } from "react-router-dom";
import { ContentLayout } from "@/components/Layout/content-layout";
import { useRequestBooking } from "../api/request-booking";
import { renderDigitalClockTimeView } from "@mui/x-date-pickers";

export const Booking = () => {
  const { locations } = useFetchLocations();
  const { mutateAsync: bookCourt } = useRequestBooking();

  const [locationId, setLocationId] = useState("");
  const [date, setDate] = useState<Dayjs | null>(null);
  const availableTimes = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22] //make this dynamic

  const navigate = useNavigate();

  return (
    <ContentLayout title="Book A Court" subtitle="Schedule court bookings here">
      <FormControl fullWidth>
        <InputLabel id="booking-location-label">Location</InputLabel>
        <Select
          labelId="booking-location-label"
          id="booking-location"
          label="Location"
          onChange={(e) => setLocationId(e.target.value as string)}
        >
          {locations.map((location, index) => (
            <MenuItem key={index} value={location.id}>{location.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {location && (
        <>
          <StaticDateTimePicker
            value={date}
            ampm={false}
            minDate={dayjs().add(5, 'day')}
            maxDate={dayjs().add(1, 'year')}
            onChange={(newDate) => {
              setDate(newDate)
            }}
            viewRenderers={{
              minutes: null,
              hours: renderDigitalClockTimeView
            }}
          />
          <Button
            onClick={() => {
              bookCourt({
              location: locations.find(({ id }) => id === locationId),
              bookingTime: date?.toISOString(),
            })
            navigate('/schedule')
            }}
            variant="contained"
          >
            Confirm
          </Button>
        </>
      )
      }
    </ContentLayout>
  )
}