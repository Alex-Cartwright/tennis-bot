import { useReducer } from "react";
import { useFetchLocations } from "../api/fetch-locations";
import { initialState, locationsReducer } from "../reducers/locations-reducer";

export const useLocationsTable = () => {
  const { locations } = useFetchLocations();

  const [state, dispatch] = useReducer(locationsReducer, initialState);

  return {
    locations,
    state,
    dispatch
  };
};
