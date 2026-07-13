import { useQuery } from "@tanstack/react-query";
import {getMarketData} from '../services/MarketData'
export const useMarketData = () => {
  return useQuery({
    queryKey: ["marketData"],
    queryFn: getMarketData,
    select: (data) => data[0],
  });
};