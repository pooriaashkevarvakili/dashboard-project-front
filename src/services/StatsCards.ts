import api from "../api/axios";

export interface StatsCards {
  title: number;
  value: string;
  icon: React.ReactNode;
change:string;
color:string
}

interface ApiResponse {
  message: string;
  data: StatsCards[];
}

export const getStatsCard = async (): Promise<StatsCards[]> => {
  const response = await api.get<ApiResponse>("/statsCards");


  return response.data.data;
};