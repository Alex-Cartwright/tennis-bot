import { ContentLayout } from "../../../components/Layout"
import { fetchLocations } from "../api/fetchLocations"
import { useCallback, useContext, useEffect } from "react"
import { LocationsTable } from "../components/LocationsTable";
import { LocationsContext } from "@/providers/LocationsContext";

export const Locations = () => {
  const { locations, setLocations } = useContext(LocationsContext);

  const refreshLocations = useCallback(() => {
    fetchLocations().then((locations) => setLocations(locations))
  }, [setLocations])

  useEffect(() => {
    refreshLocations()
  }, [refreshLocations])

  return (
    <ContentLayout title="Locations" subtitle="View Locations">
      <LocationsTable locations={locations} fetchLoctions={refreshLocations}/>
    </ContentLayout>
  )
}