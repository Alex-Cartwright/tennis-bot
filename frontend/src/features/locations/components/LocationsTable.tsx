import { useCallback, useMemo, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Location, LocationDTO } from "../types";
import { Button, TextField } from "@mui/material";
import { addLocation } from "../api/addLocation";
import { putLocation } from "../api/putLocation";
import { deleteLocation } from "../api/deleteLocation";

type LocationsTableProps = {
  locations: Location[];
  fetchLoctions: () => void;
};

export const LocationsTable = ({ locations, fetchLoctions }: LocationsTableProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditingId, setIsEditingId] = useState<string>("");
  const [newLocation, setNewLocation] = useState<LocationDTO>({
    name: "",
    url: "",
  });
  const [editLocation, setEditLocation] = useState<LocationDTO>({
    name: "",
    url: "",
  });

  const mapLocation = useCallback(
    (location: Location) => ({
      name: location.name,
      id: location.id,
      url: location.url,
    }),
    []
  );

  const clearForm = useCallback(() => {
    setNewLocation({ name: "", url: "" });
    setIsAdding(false);
  }, []);

  const addLocationRequest = useCallback(() => {
    if (newLocation.name && newLocation.url) {
      addLocation(newLocation).then(() => {
        clearForm();
        fetchLoctions();
      })
      .catch((error) => {
        console.error(error);
      }
      );
    }
  }, [newLocation, clearForm, fetchLoctions]);

  const deleteLocationRequest = useCallback((id: string) => {
    deleteLocation(id)
    .then(() => fetchLoctions())
    .catch((error) => {
      console.error(error);
    });
  }, [fetchLoctions]);

  const startAdding = useCallback(() => {
    setIsAdding(true);
    setIsEditingId("");
  }, []);

  const startEditing = useCallback((id: string, name: string, url: string) => {
    setIsEditingId(id);
    setIsAdding(false);
    setEditLocation({ name, url });
  }, []);

  const saveEdit = useCallback(
    (id: string) => {
      putLocation({ ...editLocation, id });
    },
    [editLocation]
  );

  const rows = useMemo(() => locations.map(mapLocation), [locations, mapLocation]);

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
          {rows.map((row) => (
            <TableRow key={row.id}>
              {isEditingId === row.id ? (
                <>
                  <TableCell>
                    <TextField
                      id="outlined-basic"
                      label="Name"
                      variant="outlined"
                      value={editLocation.name}
                      onChange={(e) => setEditLocation({ ...editLocation, name: e.target.value })}
                      sx={{ display: "flex" }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      id="outlined-basic"
                      label="URL"
                      variant="outlined"
                      value={editLocation.url}
                      onChange={(e) => setEditLocation({ ...editLocation, url: e.target.value })}
                      sx={{ display: "flex" }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => setIsEditingId("")}>Cancel</Button>
                    <Button onClick={() => saveEdit(row.id)}>Confirm</Button>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.url}</TableCell>
                  <TableCell>
                    <Button onClick={() => startEditing(row.id, row.name, row.url)}>Edit</Button>
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
                  onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
                  sx={{ display: "flex" }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  id="outlined-basic"
                  label="URL"
                  variant="outlined"
                  value={newLocation.url}
                  onChange={(e) => setNewLocation({ ...newLocation, url: e.target.value })}
                  sx={{ display: "flex" }}
                />
              </TableCell>
              <TableCell>
                <Button onClick={addLocationRequest}>Save</Button>
                <Button onClick={clearForm}>Cancel</Button>
              </TableCell>
            </TableRow>
          ) : 
          <TableRow>
            <TableCell colSpan={3} align="center">
              <Button onClick={startAdding}>Add Location</Button>
            </TableCell>
          </TableRow>
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
};
