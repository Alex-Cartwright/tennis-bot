import { DateCalendar } from "@mui/x-date-pickers"
import { fetchLocations } from "../api/fetchLocations"
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { ContentLayout } from "../../../components/Layout";
import { requestBooking } from "../api/requestBooking";
import dayjs from "dayjs";

export const Booking = () => {

  const locations = fetchLocations();

  const [location, setLocation] = useState('');
  const [date, setDate] = useState(null);

  const handleBooking = () => {
    if(location && date) {
      return requestBooking({location, date});
    }

    console.error("Booking failed, please select a location and date.")
  }

  return (
    <ContentLayout title="Book A Court" subtitle="Schedule court bookings here">
      <h3>Location</h3>
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
          <h3>Date</h3>
          <DateCalendar 
            value={date} 
            // disablePast={true}
            minDate={dayjs().add(5, 'day')}
            onChange={(newDate) => setDate(newDate)}
          />
          <h3>Times</h3>
          <Button onClick={handleBooking}>
            Confirm
          </Button>
        </>
      )
      }
    </ContentLayout>
  )
}