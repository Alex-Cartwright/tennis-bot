import { handleActions, Action } from "redux-actions";
import {
  RESET_UI,
  STARTED_ADDING,
  CANCELLED_ADDING,
  STARTED_EDITING,
  SET_NEW_LOCATION_NAME,
  SET_NEW_LOCATION_URL,
  SET_EDIT_LOCATION_NAME,
  SET_EDIT_LOCATION_URL,
  LocationsPayloadType,
  StartedEditingPayload,
} from "../actions/actions";
import { LocationDTO } from "../types";

export type LocationsTableState = {
  isAdding: boolean,
  isEditingId: string,
  newLocation: LocationDTO,
  editLocation: LocationDTO
}

export const initialState: LocationsTableState = {
  isAdding: false,
  isEditingId: "",
  newLocation: { name: "", url: "" },
  editLocation: { name: "", url: "" },
};

export const locationsReducer = handleActions<LocationsTableState, LocationsPayloadType>(
  {
    [RESET_UI]: () => initialState,
    [STARTED_ADDING]: (state) => ({ ...state, isAdding: true, isEditingId: ""}),
    [CANCELLED_ADDING]: (state) => ({ ...state, isAdding: false }),
    [STARTED_EDITING]: (state, action: Action<LocationsPayloadType>) => {
      const { id, name, url } = action.payload as StartedEditingPayload;
      return {
        ...state,
        isAdding: false,
        isEditingId: id,
        editLocation: { name, url }
      };
    },
    [SET_NEW_LOCATION_NAME]: (state, action) => (
      {
        ...state,
        newLocation: {...state.newLocation, name: action.payload as string}
      }
    ),
    [SET_NEW_LOCATION_URL]: (state, action) => (
      {
        ...state,
        newLocation: {...state.newLocation, url: action.payload as string}
      }
    ),
    [SET_EDIT_LOCATION_NAME]: (state, action) => (
      {
        ...state,
        editLocation: {...state.editLocation, name: action.payload as string}
      }
    ),
    [SET_EDIT_LOCATION_URL]: (state, action) => (
      {
        ...state,
        editLocation: {...state.editLocation, url: action.payload as string}
      }
    )
  },
  initialState
);