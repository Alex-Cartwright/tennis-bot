import { createAction } from "redux-actions";

export const RESET_UI = "RESET_UI";
export const STARTED_ADDING = "STARTED_ADDING";
export const CANCELLED_ADDING = "CANCELLED_ADDING";
export const STARTED_EDITING = "STARTED_EDITING";
export const SET_NEW_LOCATION_NAME = "SET_NEW_LOCATION_NAME";
export const SET_NEW_LOCATION_URL = "SET_NEW_LOCATION_URL";
export const SET_EDIT_LOCATION_NAME = "SET_EDIT_LOCATION_NAME";
export const SET_EDIT_LOCATION_URL = "SET_EDIT_LOCATION_URL";

export interface StartedEditingPayload {
  id: string;
  name: string;
  url: string;
}

export type LocationsPayloadType = void | string | StartedEditingPayload;

export const resetUI = createAction(RESET_UI);
export const startedAdding = createAction(STARTED_ADDING);
export const cancelledAdding = createAction(CANCELLED_ADDING);
export const startedEditing = createAction<StartedEditingPayload>(STARTED_EDITING);
export const setNewLocationName = createAction<string>(SET_NEW_LOCATION_NAME);
export const setNewLocationUrl = createAction<string>(SET_NEW_LOCATION_URL);
export const setEditLocationName = createAction<string>(SET_EDIT_LOCATION_NAME);
export const setEditLocationUrl = createAction<string>(SET_EDIT_LOCATION_URL);
