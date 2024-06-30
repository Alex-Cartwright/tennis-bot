import axios from "@/lib/axios";
import { Location } from "@/types";
import { useQuery } from "react-query";

export const fetchLocations = async (): Promise<Location[]> => {
  const response = await axios.get("/locations");
  return response.data;
};

export const useFetchLocations = () => {
  const {
    data: locations = [],
    isLoading,
    isError,
  } = useQuery<Location[], Error>("locations", fetchLocations);
  console.log("fetching locations", locations);
  return { locations, isLoading, isError };
};
