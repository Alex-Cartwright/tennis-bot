import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocationsProvider } from "../contexts/LocationsContext";
import { QueryClient, QueryClientProvider } from "react-query";

type AppProviderProps = {
  children: React.ReactNode
}

const queryClient = new QueryClient()

export const AppProvider = ({children} : AppProviderProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <LocationsProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </LocationsProvider>
    </LocalizationProvider>
  )
}