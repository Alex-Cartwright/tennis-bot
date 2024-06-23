import { ContentLayout } from "../../../components/Layout"
import { fetchLocations } from "../api/fetchLocations"
import { useEffect, useState } from "react"
import { Location } from "../types"

export const Locations = () => {
  const [locations, setLocations] = useState<Location[]>([])

  useEffect(() => {
    fetchLocations().then((locations) => setLocations(locations))
  }, [])

  return (
    <ContentLayout title="Locations" subtitle="View Locations">
      {locations.map((location) => (
        <div>
          <h2>{location.name}</h2>
          <p>{location.id}</p>
          <p>{location.url}</p>
        </div>
      ))}
    </ContentLayout>
  )
}