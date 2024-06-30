import { Location } from "@/types";
import { createAction } from "redux-actions";

export const STARTED_EDITING = "STARTED_EDITING";
export const SET_EDIT_LOCATION_NAME = "SET_EDIT_LOCATION_NAME";
export const SET_EDIT_LOCATION_URL = "SET_EDIT_LOCATION_URL";
export const CONFIRMED_EDITING = "CONFIRMED_EDITING";
export const CANCELLED_EDITING = "CANCELLED_EDITING";

export type LocationsPayloadType = void | string | Location;

export const startedEditing = createAction<Location>(STARTED_EDITING);
export const setEditLocationName = createAction<string>(SET_EDIT_LOCATION_NAME);
export const setEditLocationUrl = createAction<string>(SET_EDIT_LOCATION_URL);
export const confirmedEditing = createAction(CONFIRMED_EDITING);
export const cancelledEditing = createAction(CANCELLED_EDITING);
