import api from "../api/axios";

export interface Historical {
  id: number;
  date: string;
  marketCap: number;
  price: number;
  volume: number;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse {
  message: string;
  data: Historical[];
  pagination: Pagination;
}

export const getHistorical = async (
  page: number = 1,
  limit: number = 10,
): Promise<ApiResponse> => {
  const response = await api.get<ApiResponse>("/historical/all", {
    params: {
      page,
      limit,
    },
  });

  return response.data;
};
