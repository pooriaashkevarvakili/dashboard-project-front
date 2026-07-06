import api from "../api/axios";

export interface MarketStatus {
  key: number;
  title: string;
  value: string;
  prefix: string;
}

interface ApiResponse {
  message: string;
  data: MarketStatus[];
}

export const getMarketStatus = async (): Promise<MarketStatus[]> => {
  const response = await api.get<ApiResponse>("/MarketStatus");


  return response.data.data;
};
