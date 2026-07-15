import { useQuery } from "@tanstack/react-query";
import { getFutureAsset } from "../services/FuturesAsset";

export const useFutureAsset = () => {
  const query = useQuery({
    queryKey: ["futureAsset"],
    queryFn: getFutureAsset,
  });

  return {
    data: query.data?.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
  };
};