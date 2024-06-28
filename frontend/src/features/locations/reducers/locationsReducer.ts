import { LocationDTO } from "../types";

export type LocationsTableState = {
  isAdding: boolean,
  isEditingId: string,
  newLocation: LocationDTO,
  editLocation: LocationDTO
}

type Action = {
  type: string,
  payload: any
}

export const locationsReducer = (state: LocationsTableState, action: Action) : LocationsTableState => {
  switch(action.type){
    case STARTED_ADDING:
      return {
        ...state,
        isAdding: true,
        isEditingId: ""
      };
    case CANCELLED_ADDING:
      return {
        ...state,
        isAdding: false,
        newLocation: {
          name: "",
          url: ""
        }
      }
    case STARTED_EDITING:
      return {
        ...state,
        isAdding: false,
        isEditingId: action.payload.id,
        editLocation: {
          name: action.payload.name,
          url: action.payload.url
        }
      }
    case SET_NEW_LOCATION_NAME:
      return {
        ...state,
        newLocation: {
          ...state.newLocation,
          name: action.payload
        }
      }
    case SET_NEW_LOCATION_URL:
      return {
        ...state,
        newLocation: {
          ...state.newLocation,
          url: action.payload
        }
      }
    case SET_EDIT_LOCATION_NAME:
      return {
        ...state,
        editLocation: {
          ...state.editLocation,
          name: action.payload
        }
      }
    case SET_EDIT_LOCATION_URL:
      return {
        ...state,
        editLocation: {
          ...state.editLocation,
          url: action.payload
        }
      }
    case RESET_UI:
      return {
        ...state,
        isAdding: false,
        isEditingId: ""
      }
    default: return state;
  }
}

export const STARTED_ADDING = "STARTED_ADDING";
export const CANCELLED_ADDING = "CANCELLED_ADDING";
export const STARTED_EDITING = "STARTED_EDITING";
export const SET_NEW_LOCATION_NAME = "SET_NEW_LOCATION_NAME";
export const SET_NEW_LOCATION_URL = "SET_NEW_LOCATION_URL";
export const SET_EDIT_LOCATION_NAME = "SET_EDIT_LOCATION_NAME";
export const SET_EDIT_LOCATION_URL = "SET_EDIT_LOCATION_URL";
export const RESET_UI = "RESET_UI";