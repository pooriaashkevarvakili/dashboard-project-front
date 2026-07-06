import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export const usePriceChart = () => {
  return useQuery({
    queryKey: ["priceChart"],
    queryFn: async () => {
      const { data } = await api.get(
        "/priceChart"
      );

      return data.data;
    },
  });
};