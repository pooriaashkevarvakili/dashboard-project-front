import api from "../api/axios";

export interface Week {
  key: number;
  week: string;
  number: string;
}

interface ApiResponse {
  message: string;
  data: Week[];
}

export const getWeek = async (): Promise<Week[]> => {
  const { data } = await api.get<ApiResponse>("/week");

  return data.data;
};