import axios from "@/lib/axios";

export const deleteLocation = async (id: string) => {
  await axios.delete(`/locations/${id}`);
}