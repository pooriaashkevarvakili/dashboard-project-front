import api from "../api/axios";

export interface ChartSeries {
  key: number;
  priceChart: number;

}

interface ApiResponse {
  message: string;
  data: ChartSeries[];
}

export const getChartSeries = async (): Promise<ChartSeries[]> => {
  const response = await api.get<ApiResponse>("/chartSeries");


  return response.data.data;
};