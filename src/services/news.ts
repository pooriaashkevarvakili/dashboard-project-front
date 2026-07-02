import api from "../api/axios";

export interface News {
  key: number;
  description: string;
}

interface ApiResponse {
  message: string;
  data: News[];
}

export const getNews = async (): Promise<News[]> => {
  const response = await api.get<ApiResponse>("/news");

  console.log("NEWS RESPONSE:", response.data);

  return response.data.data;
};