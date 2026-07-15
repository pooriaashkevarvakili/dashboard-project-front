import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export const useOrderTable = () => {
  return useQuery({
    queryKey: ["orderTable"],
    queryFn: async () => {
      const { data } = await api.get(
        "/orderTable/all"
      );

      return data.data;
    },
  });
};