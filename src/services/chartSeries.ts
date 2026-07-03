import api from "../api/axios";

export interface ChartSeries {
  key: number;
  priceChart: number;

}

interface ApiResponse {
  message: string;
  data: ChartSeries[];
}

export const getPriceChart = async (): Promise<ChartSeries[]> => {
  const response = await api.get<ApiResponse>("/chartSeries");

  console.log("NEWS RESPONSE:", response.data);

  return response.data.data;
};