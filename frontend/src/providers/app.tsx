import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocationsProvider } from "../contexts/LocationsContext";

type AppProviderProps = {
  children: React.ReactNode
}

export const AppProvider = ({children} : AppProviderProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <LocationsProvider>
        {children}
      </LocationsProvider>
    </LocalizationProvider>
  )
}