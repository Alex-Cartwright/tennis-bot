import { Table } from "@/components/Table/Table";
import { ContentLayout } from "../../../components/Layout"
import { Location } from "@/types";
import { useLocations } from "@/hooks/useLocations";

export const Locations = () => {
  const { locations } = useLocations();

  return (
    <ContentLayout title="Locations" subtitle="View Locations">
      {/* <LocationsTable/> */}
      <Table<Location>
        data={locations}
        columns={[
          { title: "ID", field: "id" },
          { title: "Name", field: "name" },
          { title: "URL", field: "url" },
        ]}
      />
    </ContentLayout>
  )
}