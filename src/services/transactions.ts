import api from "../api/axios";

export interface Transaction {
  key: number;
  coin: string;
  type: string;
  amount: string;
  price: string;
}

interface ApiResponse {
  message: string;
  data: Transaction[];
}

export const getTranactions = async (): Promise<Transaction[]> => {
  const { data } = await api.get<ApiResponse>("/transactions");

  return data.data;
};