import api from "../api/axios";

export interface ChartsCoin {
  x: number;
  y:number;

}

interface ApiResponse {
  message: string;
  data: ChartsCoin[];
}

export const getChartCoin = async (): Promise<ChartsCoin[]> => {
  const response = await api.get<ApiResponse>("/ChartCoin");


  return response.data.data;
};