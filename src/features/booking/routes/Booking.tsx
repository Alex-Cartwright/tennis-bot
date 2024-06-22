import { DateCalendar } from "@mui/x-date-pickers"
import { fetchLocations } from "../api/fetchLocations"
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

export const Booking = () => {

  const locations = fetchLocations();

  const [location, setLocation] = useState('');

  return (
    <Box>
      <h2>Book A Court</h2>
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
          <DateCalendar />
          <h3>Times</h3>
        </>
      )}
    </Box>
  )
}