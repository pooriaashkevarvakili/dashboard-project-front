import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export const usePositionColumnsTable = () => {
  return useQuery({
    queryKey: ["positionColumnsTable"],
    queryFn: async () => {
      const { data } = await api.get(
        "/positionColumns/all"
      );

      return data.data;
    },
  });
};