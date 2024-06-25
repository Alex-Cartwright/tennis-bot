import { useCallback, useMemo, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Location } from "../types";
import { Button, TextField } from "@mui/material";
import { addLocation, AddLocationDTO } from "../api/addLocation";

type LocationsTableProps = {
  locations: Location[];
};

export const LocationsTable = ({ locations }: LocationsTableProps) => {

  const [isEditing, setIsEditing] = useState(false);
  const [newLocation, setNewLocation] = useState<AddLocationDTO>({ name: '', url: '' });

  const mapLocation = useCallback((location: Location) => ({
    name: location.name,
    id: location.id,
    url: location.url,
  }), []);

  const clearForm = useCallback(() => {
    setNewLocation({ name: '', url: '' });
    setIsEditing(false);
  }, []);

  const addLocationRequest = useCallback(() => {
    if (newLocation.name && newLocation.url) {
      addLocation(newLocation);
      clearForm();
    }
  }, [newLocation, clearForm]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewLocation((prev) => ({ ...prev, [name]: value }));
  }, []);

  const rows = useMemo(() => locations.map(mapLocation), [locations, mapLocation]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{minWidth:'250px'}}>Name</TableCell>
            <TableCell sx={{minWidth:'450px'}}>URL</TableCell>
            <TableCell sx={{minWidth:'150px'}}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.url}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={3} align="center">
              <Button onClick={() => setIsEditing(true)}>
                Add Location
              </Button>
            </TableCell>
          </TableRow>
          {isEditing && (
            <TableRow>
              <TableCell>
                <TextField id="outlined-basic" label="Name" variant="outlined"
                value={newLocation.name} onChange={handleChange} sx={{display:'flex'}}/>
              </TableCell>
              <TableCell>
                <TextField id="outlined-basic" label="URL" variant="outlined"
                value={newLocation.url} onChange={handleChange} sx={{display:'flex'}}/>
              </TableCell>
              <TableCell>
                <Button onClick={addLocationRequest}>
                  Save
                </Button>
                <Button onClick={clearForm}>
                  Cancel
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
