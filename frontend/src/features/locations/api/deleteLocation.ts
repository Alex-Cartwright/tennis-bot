import instance from "../../../lib/axios"

export const deleteLocation = async (id: string) => {
  const response = await instance.delete(`/locations/${id}`);
  return response.data;
}