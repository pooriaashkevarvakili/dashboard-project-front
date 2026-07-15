import { useQuery } from "@tanstack/react-query";
import { getMarketStatus } from "../services/MarketStatus";
export const useMarketStatus = () => {
  const query = useQuery({
    queryKey: ["marketstatus"],
    queryFn: getMarketStatus,
  });

  return {
    data: query.data ?? [],

  };
};