import axios from "@/lib/axios";

export const deleteLocation = async (id: string) => {
  const response = await axios.delete(`/locations/${id}`);
  return response.data;
}