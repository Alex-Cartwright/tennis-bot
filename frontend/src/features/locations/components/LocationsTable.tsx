import { useCallback, useMemo, useReducer } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TextField } from "@mui/material";
import { addLocation } from "../api/addLocation";
import { putLocation } from "../api/putLocation";
import { deleteLocation } from "../api/deleteLocation";
import { Location } from "@/types";
import { CANCELLED_ADDING, locationsReducer, LocationsTableState, RESET_UI, SET_EDIT_LOCATION, SET_EDIT_LOCATION_NAME, SET_EDIT_LOCATION_URL, SET_NEW_LOCATION_NAME, SET_NEW_LOCATION_URL, STARTED_ADDING, STARTED_EDITING } from "../reducers/locationsReducer";

type LocationsTableProps = {
  locations: Location[];
  fetchLocations: () => void;
};

const initialState: LocationsTableState = {
  isAdding: false,
  isEditingId: "",
  newLocation: {name: "", url: ""},
  editLocation: {name: "", url: ""},
}

export const LocationsTable = ({ locations, fetchLocations }: LocationsTableProps) => {
  const [state, dispatch] = useReducer(locationsReducer, initialState)
  const {isAdding, isEditingId, newLocation, editLocation} = state;

  const mapLocation = useCallback(
    (location: Location) => ({
      name: location.name,
      id: location.id,
      url: location.url,
    }),
    []
  );

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
  }, [newLocation, fetchLocations]);

  const deleteLocationRequest = useCallback((id: string) => {
    deleteLocation(id)
    .then(() => fetchLocations())
    .catch((error) => {
      console.error(error);
    });
  }, [fetchLocations]);

  const saveEdit = useCallback(
    (id: string) => {
      putLocation({ ...editLocation, id });
    },
    [editLocation]
  );

  const rows = useMemo(() => locations?.map(mapLocation), [locations, mapLocation]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ minWidth: "250px" }}>Name</TableCell>
            <TableCell sx={{ minWidth: "450px" }}>URL</TableCell>
            <TableCell sx={{ minWidth: "150px" }}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row) => (
            <TableRow key={row.id}>
              {isEditingId === row.id ? (
                <>
                  <TableCell>
                    <TextField
                      id="outlined-basic"
                      label="Name"
                      variant="outlined"
                      value={editLocation.name}
                      onChange={(e) => 
                        dispatch({type: SET_EDIT_LOCATION_NAME, payload: e.target.value})
                      }
                      sx={{ display: "flex" }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      id="outlined-basic"
                      label="URL"
                      variant="outlined"
                      value={editLocation.url}
                      onChange={(e) => 
                        dispatch({type: SET_EDIT_LOCATION_URL, payload: e.target.value})
                      }
                      sx={{ display: "flex" }}
                    />
                  </TableCell>
                  <TableCell>
                    {/* <Button onClick={() => setIsEditingId("")}>Cancel</Button> */}
                    <Button onClick={() => saveEdit(row.id)}>Confirm</Button>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.url}</TableCell>
                  <TableCell>
                    <Button onClick={() => dispatch({
                      type: STARTED_EDITING,
                      payload: {
                        id: row.id,
                        name: row.name,
                        url: row.url
                      }
                    })
                    }>Edit</Button>
                    <Button onClick={() => deleteLocationRequest(row.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
          {isAdding ? (
            <TableRow>
              <TableCell>
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  value={newLocation.name}
                  onChange={(e) => 
                    dispatch({type: SET_NEW_LOCATION_NAME, payload: e.target.value})
                  }
                  sx={{ display: "flex" }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  id="outlined-basic"
                  label="URL"
                  variant="outlined"
                  value={newLocation.url}
                  onChange={(e) => 
                    dispatch({type: SET_NEW_LOCATION_URL, payload: e.target.value})
                  }
                  sx={{ display: "flex" }}
                />
              </TableCell>
              <TableCell>
                <Button onClick={addLocationRequest}>Save</Button>
                <Button onClick={() => dispatch({type: CANCELLED_ADDING})}>Cancel</Button>
              </TableCell>
            </TableRow>
          ) : 
          <TableRow>
            <TableCell colSpan={3} align="center">
              <Button onClick={() => dispatch({type: STARTED_ADDING})}>Add Location</Button>
            </TableCell>
          </TableRow>
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};
