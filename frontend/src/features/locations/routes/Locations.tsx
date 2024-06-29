import { ContentLayout } from "../../../components/Layout"
import { LocationsTable } from "../components/LocationsTable";

export const Locations = () => {

  return (
    <ContentLayout title="Locations" subtitle="View Locations">
      <LocationsTable/>
    </ContentLayout>
  )
}