import { useQuery } from "@tanstack/react-query";
import { getAssetHeader } from "../services/AssetHeader";

export const useAssetHeader = () => {
  return useQuery({
    queryKey: ["assetHeader"],
    queryFn: getAssetHeader,
    select: (data) => data[0],
  });
};