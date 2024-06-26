import { ContentLayout } from "../../../components/Layout"
import { fetchLocations } from "../api/fetchLocations"
import { useCallback, useEffect, useState } from "react"
import { Location } from "../types"
import { LocationsTable } from "../components/LocationsTable";

export const Locations = () => {
  const [locations, setLocations] = useState<Location[]>([])

  const refreshLocations = useCallback(() => {
    fetchLocations().then((locations) => setLocations(locations))
  }, [])

  useEffect(() => {
    refreshLocations()
  }, [refreshLocations])

  return (
    <ContentLayout title="Locations" subtitle="View Locations">
      <LocationsTable locations={locations} fetchLoctions={refreshLocations}/>
    </ContentLayout>
  )
}