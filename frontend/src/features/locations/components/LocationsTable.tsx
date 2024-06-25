import { useCallback, useMemo, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Location } from "../types";
import { Button, TextField } from "@mui/material";
import { addLocation, AddLocationDTO } from "../api/addLocation";
import { putLocation } from "../api/putLocation";

type LocationsTableProps = {
  locations: Location[];
};

export const LocationsTable = ({ locations }: LocationsTableProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<string>("");
  const [newLocation, setNewLocation] = useState<AddLocationDTO>({
    name: "",
    url: "",
  });
  const [editLocation, setEditLocation] = useState<AddLocationDTO>({
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
      addLocation(newLocation);
      clearForm();
    }
  }, [newLocation, clearForm]);

  const startEditing = useCallback((id: string) => {
    setIsEditing(id);
    setIsAdding(false);
  }, []);

  const deleteLocation = useCallback((id: string) => {
    deleteLocation(id);
  }, []);

  const saveEdit = useCallback(
    (id: string) => {
      putLocation({ ...editLocation, id });
    },
    [editLocation]
  );

  const startAdding = useCallback(() => {
    setIsAdding(true);
    setIsEditing("");
  }, []);

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
              {isEditing === row.id ? (
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
                    <Button onClick={() => startEditing("")}>Cancel</Button>
                    <Button onClick={() => saveEdit(row.id)}>Confirm</Button>
                  </TableCell>
                </>
              ) : (
                <>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.url}</TableCell>
                  <TableCell>
                    <Button onClick={() => startEditing(row.id)}>Edit</Button>
                    <Button onClick={() => deleteLocation(row.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </>
              )}
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={3} align="center">
              <Button onClick={startAdding}>Add Location</Button>
            </TableCell>
          </TableRow>
          {isAdding && (
            <TableRow>
              <TableCell>
                <TextField
                  id="outlined-basic"
                  label="Name"
                  variant="outlined"
                  value={newLocation.name}
                  onChange={(e) => setNewLocation({ ...editLocation, name: e.target.value })}
                  sx={{ display: "flex" }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  id="outlined-basic"
                  label="URL"
                  variant="outlined"
                  value={newLocation.url}
                  onChange={(e) => setNewLocation({ ...editLocation, url: e.target.value })}
                  sx={{ display: "flex" }}
                />
              </TableCell>
              <TableCell>
                <Button onClick={addLocationRequest}>Save</Button>
                <Button onClick={clearForm}>Cancel</Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
