import api from "../api/axios";

export interface tranacactionFilter {
  id: number,
    coin: string,
    type: string,
    amount:number,
    txId: string,
    address: string,
    description: string,
    createdAt:string,
    updatedAt: string
}

interface ApiResponse {
  message: string;
  data: tranacactionFilter[];
}

export const gettranacactionFilter = async (): Promise<ApiResponse> => {
  const response = await api.get<ApiResponse>("/filter-transaction/all");
  return response.data;
};