import { DateCalendar, TimePicker } from "@mui/x-date-pickers"
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { ContentLayout } from "../../../components/Layout";
import { requestBooking } from "../api/requestBooking";
import dayjs from "dayjs";
import { useLocations } from "@/hooks/useLocations";

export const Booking = () => {
  const { locations } = useLocations();

  const [location, setLocation] = useState("");
  const [date, setDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState<number[]>([]);

  const handleBooking = () => {
    if(location && date) {
      return requestBooking({location, date});
    }

    console.error("Booking failed, please select a location and date.")
  }

  useEffect(() => {
    const availableTimes = locations.filter(loc => loc.name === location)[0]?.times
    setAvailableTimes(availableTimes)
  }, [location])

  return (
    <ContentLayout title="Book A Court" subtitle="Schedule court bookings here">
      <FormControl fullWidth>
        <InputLabel id="booking-location-label">Location</InputLabel>
        <Select
          labelId="booking-location-label"
          id="booking-location"
          label="Location"
          onChange={(e) => setLocation(e.target.value as string)}
        >
          {locations.map((location, index) => (
            <MenuItem key={index} value={location.name}>{location.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {location && (
        <>
          <DateCalendar 
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
              <Button onClick={handleBooking}>
                Confirm Booking
              </Button>
            </Box>
          ) : null}
        </>
      )
      }
    </ContentLayout>
  )
}