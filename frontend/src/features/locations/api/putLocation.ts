import instance from "@/lib/axios"
import { Location } from "@/types"

export const putLocation = async (location: Location) => {
  const response = await instance.put(`/locations/${location.id}`, {name: location.name, url: location.url});
  return response.data;
}