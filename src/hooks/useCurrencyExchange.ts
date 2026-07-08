import { useQuery } from "@tanstack/react-query";
import {getCurrencyExchange } from "../services/currencyExchange";
export const useCurrencyExchange = () => {
  const query = useQuery({
    queryKey: ["currencyExchange"],
    queryFn: getCurrencyExchange,
  });

  return {
    data: query.data ?? [],

  };
};