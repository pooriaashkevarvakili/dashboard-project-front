import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export const useTransactionsTable = () => {
  return useQuery({
    queryKey: ["transactionsTable"],
    queryFn: async () => {
      const { data } = await api.get(
        "/transactions/all"
      );

      return data.data;
    },
  });
};