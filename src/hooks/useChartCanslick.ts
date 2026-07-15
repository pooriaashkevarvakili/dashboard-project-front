import { useQuery } from "@tanstack/react-query";
import { getChartSeriesCanslick } from "../services/ChartSeriesCanslick";
export const useChartCanslick = () => {
  const query = useQuery({
    queryKey: ["chartCanslick"],
    queryFn: getChartSeriesCanslick,
  });

  return {
    data: query.data ?? [],

  };
};