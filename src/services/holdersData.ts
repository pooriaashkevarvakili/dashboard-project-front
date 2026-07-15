import api from "../api/axios";

export interface HoldersData {
  label: string;
  value: number;
  color: string;
}

interface ApiResponse {
  message: string;
  data: HoldersData[];
}

export const getHoldersData = async (): Promise<HoldersData[]> => {
  const response = await api.get<ApiResponse>("/holdersData");

  return response.data.data;
};
