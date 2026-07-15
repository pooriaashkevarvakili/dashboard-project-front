import api from "../api/axios";

export interface Summery {
  price: number,
  priceRange: {
    low: number,
    high: number
  },
  totalInvested: number,
  currentValue: number,
  roi: number,
  totalBalance: number
}

interface ApiResponse {
  message: string;
  data: Summery;
}

export const getSummery = async (): Promise<Summery> => {
  const response = await api.get<ApiResponse>("/summary");
  return response.data.data;
};