import api from "../api/axios";
import type { Timeframe, PricePoint } from "../pages/Components/Coin/data/types";

interface ApiResponse {
  success: boolean;
  data: PricePoint[];
}

export const getChartCoinData = async (
  timeframe: Timeframe
): Promise<PricePoint[]> => {
  const response = await api.get<ApiResponse>(
    "/chart-query/ChartCoinData",
    {
      params: {
        timeframe,
      },
    }
  );

  return response.data.data;
};