import { createContext, ReactNode, useEffect, useState } from "react";
import { Location } from "@/types";
import { fetchLocations } from "@/features/locations/api/fetchLocations";

// Define the context type
export interface LocationsContextType {
  locations: Location[];
  setLocations: React.Dispatch<React.SetStateAction<Location[]>>;
}

// Create the context with a default value
const LocationsContext = createContext<LocationsContextType>({
  locations: [],
  setLocations: () => {},
});

export const LocationsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locations, setLocations] = useState<Location[]>([]);

  useEffect(() => {
    fetchLocations().then(locations => setLocations(locations))
  }, [])

  return (
    <LocationsContext.Provider value={{ locations, setLocations }}>
      {children}
    </LocationsContext.Provider>
  );
};

export default LocationsContext;