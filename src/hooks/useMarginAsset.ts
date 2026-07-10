import { useQuery } from "@tanstack/react-query";
import { getMarginAsset } from "../services/MarginAsset";
export const useMarginAsset = () => {
  const query = useQuery({
    queryKey: ["marginAsset"],
    queryFn: getMarginAsset,
  });

  return {
     data: query.data?.data ?? [],
    isLoading: query.isLoading,
    error: query.error,

  };
};