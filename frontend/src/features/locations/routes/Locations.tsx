import { Button } from "@mui/material"
import { ContentLayout } from "../../../components/Layout"
import { fetchLocations } from "../api/fetchLocations"

export const Locations = () => {
  return (
    <ContentLayout title="Locations" subtitle="View Locations">
      <>
        Location
        <Button onClick={() => fetchLocations()}>

        </Button>
      </>
    </ContentLayout>
  )
}