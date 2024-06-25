import instance from "../../../lib/axios"
import { Location } from "../types"

export const putLocation = async (location: Location) => {
  const response = await instance.put(`/locations/${location.id}`, location);
  return response.data;
}