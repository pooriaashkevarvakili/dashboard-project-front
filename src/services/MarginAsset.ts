import api from "../api/axios";

export interface MarginAsset {
  id: number;

  key: string;

  currency: string;

  name: string;

  icon: string;

  balance: number;

  usdValue: number;

  available: number;

  frozen: number;

  change24h: number;
}

interface ApiResponse {
  message: string;
  data: MarginAsset[];
}

export const getMarginAsset = async (): Promise<ApiResponse> => {
  const response = await api.get<ApiResponse>("/marginAsset/all");
  return response.data;
};
