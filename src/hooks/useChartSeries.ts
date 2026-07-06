import { useQuery } from "@tanstack/react-query";
import { getChartSeries } from "../services/chartSeries";
export const useChartSeries = () => {
  const query = useQuery({
    queryKey: ["chartSerires"],
    queryFn: getChartSeries,
  });

  return {
    data: query.data ?? [],

  };
};