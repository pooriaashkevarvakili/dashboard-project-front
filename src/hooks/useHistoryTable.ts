import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export const useHistoryTable = () => {
  return useQuery({
    queryKey: ["orderHistoryTable"],
    queryFn: async () => {
      const { data } = await api.get(
        "/orderHistoryTable/all"
      );

      return data.data;
    },
  });
};