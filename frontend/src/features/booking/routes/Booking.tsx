import { DateCalendar, TimePicker } from "@mui/x-date-pickers"
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { ContentLayout } from "../../../components/Layout";
import dayjs, { Dayjs } from "dayjs";
import { useFetchLocations } from "@/features/locations/api/fetch-locations";
import { useRequestBooking } from "../api/request-booking";
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';

export const Booking = () => {
  const { locations } = useFetchLocations();
  const { mutateAsync: bookCourt } = useRequestBooking();

  const [locationId, setLocationId] = useState("");
  const [date, setDate] = useState<Dayjs | null>(null);
  const availableTimes = [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22] //make this dynamic

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
            minDate={dayjs().add(5, 'day')}
            maxDate={dayjs().add(1, 'year')}
            onChange={(newDate) => {
              setDate(newDate)
            }}
          />
          <Button
            onClick={() => bookCourt({
              location: locations.find(({ id }) => id === locationId),
              bookingTime: date?.toISOString(),
            })}
            variant="contained"
          >
            Confirm
          </Button>
          {/* <DateCalendar 
            value={date} 
            minDate={dayjs().add(5, 'day')}
            maxDate={dayjs().add(1, 'year')}
            onChange={(newDate) => setDate(newDate)}
          />
          {availableTimes ? (
            <Box sx={{display: 'flex', flexDirection: 'column', gap:2}}>
              <TimePicker
                minTime={dayjs().set('hour', Math.min(...availableTimes))}
                maxTime={dayjs().set('hour', Math.max(...availableTimes))}
              />
              <Button onClick={() => bookCourt({
                location,
                date: date?.toISOString(),
              })}>
                Confirm Booking
              </Button>
            </Box>
          ) : null} */}
        </>
      )
      }
    </ContentLayout>
  )
}