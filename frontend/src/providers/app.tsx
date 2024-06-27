import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocationsContext } from "./LocationsContext";
import { useState } from "react";
import { Location } from "@/types";

type AppProviderProps = {
  children: React.ReactNode
}

export const AppProvider = ({children} : AppProviderProps) => {
  const [locations, setLocations] = useState<Location[]>([]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <LocationsContext.Provider value={{locations, setLocations}}>
        {children}
      </LocationsContext.Provider>
    </LocalizationProvider>
  )
}