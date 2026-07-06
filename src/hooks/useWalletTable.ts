import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export const useWalletTable = () => {
  return useQuery({
    queryKey: ["orderWalletTable"],
    queryFn: async () => {
      const { data } = await api.get(
        "/wallet/all"
      );

      return data.data;
    },
  });
};