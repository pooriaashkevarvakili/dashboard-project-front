import api from "../api/axios";

export interface metrics {
  title: string;
  value: string;
  className:string
}

interface ApiResponse {
  message: string;
  data: metrics[];
}

export const getMetrics = async (): Promise<metrics[]> => {
  const { data } = await api.get<ApiResponse>("/metrics");

  return data.data;
};