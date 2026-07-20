import api from "../api/axios";

export interface Month {
  key: number;
  month: string;
  number:number
}

interface ApiResponse {
  message: string;
  data: Month[];
}

export const getMonth = async (): Promise<Month[]> => {
  const { data } = await api.get<ApiResponse>("/month");

  return data.data;
};