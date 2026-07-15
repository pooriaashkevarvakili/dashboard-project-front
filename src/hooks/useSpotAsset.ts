import { useQuery } from "@tanstack/react-query";
import { getSpotAsset } from "../services/spotAsset";

export const useSpotAsset = () => {
  const query = useQuery({
    queryKey: ["spotAsset"],
    queryFn: getSpotAsset,
  });

  return {
    data: query.data?.data ?? [],
    message: query.data?.message,
    isLoading: query.isLoading,
  };
};