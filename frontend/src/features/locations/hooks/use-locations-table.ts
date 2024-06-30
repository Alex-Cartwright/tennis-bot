import { useEffect, useReducer } from "react";
import { useFetchLocations } from "../api/fetch-locations";
import { initialState, locationsReducer } from "../reducers/locationsReducer";

export const useLocationsTable = () => {
  const { locations } = useFetchLocations();

  const [state, dispatch] = useReducer(locationsReducer, initialState);

  useEffect(() => {
    console.log("useLocationsTable rendered");
  }, []);

  useEffect(() => {
    console.log("state changed", state);
  }, [state]);

  return {
    locations,
    state,
    dispatch
  };
};
