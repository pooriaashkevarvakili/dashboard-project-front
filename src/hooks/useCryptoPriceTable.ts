import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export const useCryptoPriceTable = () => {
  return useQuery({
    queryKey: ["cryptoPriceTable"],
    queryFn: async () => {
      const { data } = await api.get(
        "/cryptoPricesService/all"
      );

      return data.data;
    },
  });
};