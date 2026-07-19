import api from "../api/axios";

export interface ChartPoint {
  x: string;
  y: number;
}

export const getChartData = async (
  symbol: string
): Promise<ChartPoint[]> => {
  const response = await api.get<ChartPoint[]>("/chart-alert", {
    params: {
      symbol,
    },
  });

  return response.data;
};