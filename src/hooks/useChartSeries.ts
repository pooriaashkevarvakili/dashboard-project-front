import { useQuery } from "@tanstack/react-query";
import { getChartSeriesDataNumber } from "../services/ChartSeriesData";
import type { Timeframe } from "../types/Timeframe";

export const useChartSeries = (timeframe: Timeframe) => {
  const query = useQuery({
    queryKey: ["chartSeriesDataNumber", timeframe],
    queryFn: () => getChartSeriesDataNumber(timeframe),
    staleTime: 60 * 1000,
  });

  return {
    data: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
  };
};