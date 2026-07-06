import { useQuery } from "@tanstack/react-query";
import { getProgressAssetDetails } from "../services/ProgressAssetDetails";
export const useProgressAssetDetails = () => {
  const query = useQuery({
    queryKey: ["progressAssetDetails"],
    queryFn: getProgressAssetDetails,
  });

  return {
    data: query.data ?? [],

  };
};