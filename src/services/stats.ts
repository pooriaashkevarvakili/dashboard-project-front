import api from "../api/axios";

export interface Stats {
  key: number;
  title: string;
value:string;
change:string
}

interface ApiResponse {
  message: string;
  data: Stats[];
}

export const getStats = async (): Promise<Stats[]> => {
  const response = await api.get<ApiResponse>("/stats");

  console.log("NEWS RESPONSE:", response.data);

  return response.data.data;
};