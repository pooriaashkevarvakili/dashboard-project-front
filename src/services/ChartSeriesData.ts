import api from "../api/axios";
import type {
  Timeframe,
  ChartSeriesItem,
  ChartSeriesResponse,
} from "../types/Timeframe";

export const getChartSeriesDataNumber = async (
  timeframe: Timeframe
): Promise<ChartSeriesItem[]> => {
  const { data } = await api.get<ChartSeriesResponse>(
    "/chart-query/chartSeriesDataNumber",
    {
      params: {
        timeframe,
      },
    }
  );

  return data.data;
};