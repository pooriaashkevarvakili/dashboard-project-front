import api from "../api/axios";

export interface holdersTabAddress {
  addr: string;
  balance: string;
  share: number;
}

interface ApiResponse {
  message: string;
  data: holdersTabAddress[];
}

export const getholdersTabAddress = async (): Promise<holdersTabAddress[]> => {
  const response = await api.get<ApiResponse>("/holdersTabAddress");

  return response.data.data;
};
