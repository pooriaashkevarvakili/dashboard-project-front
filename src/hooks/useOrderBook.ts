import { useQuery } from "@tanstack/react-query";
import { getOrderBook } from "../services/OrderBook";
export const useOrderBook = () => {
  const query = useQuery({
    queryKey: ["orderBook"],
    queryFn: getOrderBook,
  });

  return {
    data: query.data ?? [],

  };
};