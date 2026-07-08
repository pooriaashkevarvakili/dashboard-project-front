import { useQuery } from "@tanstack/react-query";
import { getMarketTrades } from "../services/MarketTrades";
export const useMarketTrade = () => {
  const query = useQuery({
    queryKey: ["marketTrade"],
    queryFn: getMarketTrades,
  });

  return {
    data: query.data ?? [],

  };
};