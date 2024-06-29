import { ContentLayout } from "../../../components/Layout"
import { fetchLocations } from "../api/fetchLocations"
import { useCallback, useEffect } from "react"
import { LocationsTable } from "../components/LocationsTable";
import { useLocations } from "@/hooks/useLocations";

export const Locations = () => {

  return (
    <ContentLayout title="Locations" subtitle="View Locations">
      <LocationsTable locations={locations} refreshLocations={refreshLocations}/>
    </ContentLayout>
  )
}