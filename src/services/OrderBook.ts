import api from "../api/axios";

export interface OrderBook {
  key: number;
  amount:number
  price:number
  total:number
  side:Boolean
}

interface ApiResponse {
  message: string;
  data: OrderBook[];
}

export const getOrderBook = async (): Promise<OrderBook[]> => {
  const response = await api.get<ApiResponse>("/orderBook/all");
  return response.data.data;
};