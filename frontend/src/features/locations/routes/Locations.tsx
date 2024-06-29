import { ContentLayout } from "../../../components/Layout"
import { fetchLocations } from "../api/fetchLocations"
import { useCallback, useEffect } from "react"
import { LocationsTable } from "../components/LocationsTable";
import { useLocations } from "@/hooks/useLocations";

export const Locations = () => {
  const { locations, setLocations } = useLocations();

  const refreshLocations = useCallback(() => {
    fetchLocations().then((locations) => setLocations(locations))
  }, [setLocations])

  useEffect(() => {
    refreshLocations()
  }, [refreshLocations])

  return (
    <ContentLayout title="Locations" subtitle="View Locations">
      <LocationsTable locations={locations} setLocations={setLocations}/>
    </ContentLayout>
  )
}