import { useCallback, useReducer } from "react";
import { deleteLocation } from "../api/deleteLocation";
import { fetchLocations } from "../api/fetchLocations";
import { locationsReducer } from "../reducers/locationsReducer";
import { addLocation } from "../api/addLocation";

type LocationsTableState = {
  isAdding: boolean,
  isEditingId: string,
  newLocation: {name: string, url: string},
  editLocation: {name: string, url: string}
}

const initialState: LocationsTableState = {
  isAdding: false,
  isEditingId: "",
  newLocation: {name: "", url: ""},
  editLocation: {name: "", url: ""},
}

export const useLocationsTable = () => {
  const [state, dispatch] = useReducer(locationsReducer, initialState)
  const {isAdding, isEditingId, newLocation, editLocation} = state;

  const addLocationRequest = useCallback(() => {
    if (newLocation.name && newLocation.url) {
      addLocation(newLocation).then(() => {
        dispatch({type: RESET_UI})
        fetchLocations();
      })
      .catch((error) => {
        console.error(error);
      }
      );
    }
  }, [newLocation]);

  const deleteLocationRequest = useCallback((id: string) => {
    deleteLocation(id)
    .then(() => fetchLocations())
    .catch((error) => {
      console.error(error);
    });
  }, []);

  return {
    addLocationRequest,
    deleteLocationRequest,
    isAdding,
    isEditingId,
    newLocation,
    editLocation,
    dispatch
  }
}