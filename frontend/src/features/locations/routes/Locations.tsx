import { ContentLayout } from "../../../components/Layout"
import { fetchLocations } from "../api/fetchLocations"
import { useEffect, useState } from "react"
import { Location } from "../types"
import { LocationsTable } from "../components/LocationsTable";

export const Locations = () => {
  const [locations, setLocations] = useState<Location[]>([])

  useEffect(() => {
    fetchLocations().then((locations) => setLocations(locations))
  }, [])

  return (
    <ContentLayout title="Locations" subtitle="View Locations">
      <LocationsTable locations={locations}/>
    </ContentLayout>
  )
}