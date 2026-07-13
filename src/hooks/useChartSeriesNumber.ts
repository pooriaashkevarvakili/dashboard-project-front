import { useQuery } from "@tanstack/react-query";
import { getChartSeriesDataNumber } from "../services/ChartSeriesData";
import type { Timeframe } from "../types/Timeframe";

export const useChartSeries = (timeframe: Timeframe) => {
  return useQuery({
    queryKey: ["chartSeriesDataNumber", timeframe],
    queryFn: () => getChartSeriesDataNumber(timeframe),
    staleTime: 60 * 1000,
  });
};