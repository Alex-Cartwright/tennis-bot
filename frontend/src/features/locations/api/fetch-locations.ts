import api from "@/lib/api-client";
import { Location } from "@/types";
import { useQuery } from "react-query";

export const fetchLocations = async (): Promise<Location[]> => {
  return await api.get("/locations");
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
