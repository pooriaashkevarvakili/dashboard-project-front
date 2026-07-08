import api from "../api/axios";

export interface ChartSeriesCanslick {
  key: number;
  priceChart: number;
  time: string,
      open: number,
      high:number,
      low: number,
      close: number

}

interface ApiResponse {
  message: string;
  data: ChartSeriesCanslick[];
}

export const getChartSeriesCanslick = async (): Promise<ChartSeriesCanslick[]> => {
  const response = await api.get<ApiResponse>("/chartSeriesCanslick");


  return response.data.data;
};