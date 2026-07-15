import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export const useExchangeTable = () => {
  return useQuery({
    queryKey: ["exchangeTable"],
    queryFn: async () => {
      const { data } = await api.get(
        "/exchange/all"
      );

      return data.data;
    },
  });
};