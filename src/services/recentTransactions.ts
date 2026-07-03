import api from "../api/axios";

export interface recentTransactions {
  key: number;
  time: string;
  type:string
amount:string
status:string
}

interface ApiResponse {
  message: string;
  data: recentTransactions[];
}

export const getRecentTransactions = async (): Promise<ApiResponse> => {
  const response = await api.get<ApiResponse>("/recentTransactions");
  return response.data;
};