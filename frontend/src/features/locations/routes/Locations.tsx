import { ContentLayout } from "../../../components/Layout"
import { fetchLocations } from "../api/fetchLocations"
import { useCallback, useEffect, useMemo, useState } from "react"
import { Location } from "../types"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const Locations = () => {
  const [locations, setLocations] = useState<Location[]>([])

  useEffect(() => {
    fetchLocations().then((locations) => setLocations(locations))
  }, [])

  const mapLocation = useCallback((location: Location) => (
    {
      name: location.name,
      id: location.id,
      url: location.url
    }
  ), [])

  const rows = useMemo(() => locations.map(mapLocation), [locations, mapLocation])

  return (
    <ContentLayout title="Locations" subtitle="View Locations">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>URL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.url}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ContentLayout>
  )
}