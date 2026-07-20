import { useQuery } from "@tanstack/react-query";
import { getMetrics } from "../services/metrics";
export const useMetrics = () => {
  const query = useQuery({
    queryKey: ["metrics"],
    queryFn: getMetrics,
  });

  return {
    data: query.data ?? [],
   
  };
};