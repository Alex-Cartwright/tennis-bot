import { handleActions, Action } from "redux-actions";
import {
  STARTED_EDITING,
  LocationsPayloadType,
  SET_EDIT_LOCATION_NAME,
  SET_EDIT_LOCATION_URL,
  CANCELLED_EDITING,
  CONFIRMED_EDITING,
} from "../actions/actions";
import { Location } from "@/types";

export type LocationsTableState = {
  editingId: string;
  editingName: string;
  editingUrl: string;
}

export const initialState: LocationsTableState = {
  editingId: "",
  editingName: "",
  editingUrl: "",
};

export const locationsReducer = handleActions<LocationsTableState, LocationsPayloadType>(
  {
    [STARTED_EDITING]: (_, action: Action<LocationsPayloadType>) => {
      const { id, name, url } = action.payload as Location;
      return {
        editingId: id,
        editingName: name,
        editingUrl: url
      };
    },
    [SET_EDIT_LOCATION_NAME]: (state, action) => (
      {
        ...state,
        editingName: action.payload as string
      }
    ),
    [SET_EDIT_LOCATION_URL]: (state, action) => (
      {
        ...state,
        editingUrl: action.payload as string
      }
    ),
    [CONFIRMED_EDITING]: () => initialState,
    [CANCELLED_EDITING]: () => {
      console.log("cancelled")
      return initialState
    }
  },
  initialState
);