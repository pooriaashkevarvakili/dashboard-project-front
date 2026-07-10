import api from "../api/axios";

export interface walletFooter {
  key: number;
  value: string;
  assets: number;
 
}

interface ApiResponse {
  message: string;
  data: walletFooter[];
}

export const getWalletFooter = async (): Promise<walletFooter[]> => {
  const { data } = await api.get<ApiResponse>("/walletFooter");

  return data.data;
};