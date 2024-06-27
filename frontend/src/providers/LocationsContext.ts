import { createContext } from "react";
import { Location } from "@/types";

// Define the context type
interface LocationsContextType {
  locations: Location[];
  setLocations: React.Dispatch<React.SetStateAction<Location[]>>;
}

// Create the context with a default value
export const LocationsContext = createContext<LocationsContextType>({
  locations: [],
  setLocations: () => {},
});
