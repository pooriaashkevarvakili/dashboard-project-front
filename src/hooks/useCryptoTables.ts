import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export const useCryptoTables = () => {
  return useQuery({
    queryKey: ["cryptoPriceTable"],
    queryFn: async () => {
      const { data } = await api.get(
        "/cryptoTables/all"
      );

      return data.data;
    },
  });
};