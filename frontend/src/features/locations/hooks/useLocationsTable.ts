import { useCallback, useEffect, useReducer } from "react";
import { deleteLocation } from "../api/deleteLocation";
import { initialState, locationsReducer } from "../reducers/locationsReducer";
import { addLocation } from "../api/addLocation";
import { putLocation } from "../api/putLocation";
import { resetUI } from "../actions/actions";
import { fetchLocations } from "../api/fetchLocations";
import { useLocations } from "@/hooks/useLocations";

export const useLocationsTable = () => {
  const {locations, setLocations } = useLocations();
  const [state, dispatch] = useReducer(locationsReducer, initialState)
  const {isAdding, isEditingId, newLocation, editLocation} = state;

  const refreshLocations = useCallback(() => {
    fetchLocations().then((locations) => setLocations(locations))
  }, [setLocations])

  useEffect(() => {
    refreshLocations()
  }, [refreshLocations])

  const addLocationRequest = useCallback(async () => {
    if (newLocation.name && newLocation.url) {
      try {
        const response = await addLocation(newLocation);
        setLocations([...locations, { ...newLocation, id: response.id}]);
        dispatch(resetUI())
      } catch (error) {
        console.error(error);
      }
    }
  }, [newLocation, locations, setLocations]);

  const deleteLocationRequest = useCallback(async (id: string) => {
    try {
      const response = await deleteLocation(id);
      setLocations(locations.filter((location) => location.id !== response.id));
    } catch (error) {
      console.error(error);
    }
  }, [setLocations, locations]);

  const saveEdit = useCallback(
    (id: string) => {
      putLocation({ ...editLocation, id });
    },
    [editLocation]
  );

  return {
    addLocationRequest,
    deleteLocationRequest,
    isAdding,
    isEditingId,
    newLocation,
    editLocation,
    saveEdit,
    dispatch
  }
}