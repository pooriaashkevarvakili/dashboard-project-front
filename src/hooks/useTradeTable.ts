import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export const useTradeTable = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["tradeTable", page, limit],
    queryFn: async () => {
      const { data } = await api.get(
        `/trade/all?page=${page}&limit=${limit}`
      );

      return data;
    },
  });
};