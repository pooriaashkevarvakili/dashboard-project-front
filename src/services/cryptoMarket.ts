import api from "../api/axios";

export interface Coin {
  name: string;
  symbol: string;
}

export interface Cryptomarket {
  id: number;
  price: number;
  coin: Coin;
  marketCap: number;
  volume: number;
  circulatingSupply: number;
  ath: number;
  atl: number;
  change: number[];
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse {
  message: string;
  data: Cryptomarket[];
  pagination: Pagination;
}

export const getCryptomarkets = async (
  page: number = 1,
  limit: number = 10
): Promise<ApiResponse> => {
  const response = await api.get<ApiResponse>("/cryptoMarket/all", {
    params: {
      page,
      limit,
    },
  });

  return response.data;
};