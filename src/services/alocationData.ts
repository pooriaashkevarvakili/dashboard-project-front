import api from "../api/axios";

export interface AllocationData {
  name: string;
  value: number;
  color: string;
}

interface ApiResponse {
  message: string;
  data: AllocationData[];
}

export const getAlocationData = async (): Promise<AllocationData[]> => {
  const { data } = await api.get<ApiResponse>("/alocationData");

  return data.data;
};