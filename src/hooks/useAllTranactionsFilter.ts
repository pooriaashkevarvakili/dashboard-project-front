import { useQuery } from "@tanstack/react-query";
import { gettranacactionFilter } from "../services/tranactionFilterAll";
export const useTranactionAllFilter = () => {
  const query = useQuery({
    queryKey: ["tranacactionFilter"],
    queryFn: gettranacactionFilter,
  });

  return {
    data: query.data ?? [],

  };
};