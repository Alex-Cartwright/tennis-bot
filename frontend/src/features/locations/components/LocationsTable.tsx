import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TextField } from "@mui/material";
import { useLocationsTable } from "../hooks/useLocationsTable";
import {
  cancelledAdding,
  resetUI,
  setEditLocationName,
  setEditLocationUrl,
  setNewLocationName,
  setNewLocationUrl,
  startedAdding,
  startedEditing,
} from "../actions/actions";
import { useLocations } from "@/hooks/useLocations";

export const LocationsTable = () => {
  const { locations } = useLocations();
  const {
    addLocationRequest,
    deleteLocationRequest,
    dispatch,
    saveEdit,
    state
  } = useLocationsTable();
  const { isAdding, isEditingId, newLocation, editLocation } = state;

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
          {locations?.map((row) => (
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
                        dispatch(setEditLocationName(e.target.value))
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
                        dispatch(setEditLocationUrl(e.target.value))
                      }
                      sx={{ display: "flex" }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => dispatch(resetUI())}>
                      Cancel
                    </Button>
                    <Button onClick={() => saveEdit(row.id)}>Confirm</Button>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.url}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() =>
                        dispatch(
                          startedEditing({
                            id: row.id,
                            name: row.name,
                            url: row.url,
                          })
                        )
                      }
                    >
                      Edit
                    </Button>
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
                  onChange={(e) => dispatch(setNewLocationName(e.target.value))}
                  sx={{ display: "flex" }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  id="outlined-basic"
                  label="URL"
                  variant="outlined"
                  value={newLocation.url}
                  onChange={(e) => dispatch(setNewLocationUrl(e.target.value))}
                  sx={{ display: "flex" }}
                />
              </TableCell>
              <TableCell>
                <Button onClick={addLocationRequest}>Save</Button>
                <Button onClick={() => dispatch(cancelledAdding())}>
                  Cancel
                </Button>
              </TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell colSpan={3} align="center">
                <Button onClick={() => dispatch(startedAdding())}>
                  Add Location
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
