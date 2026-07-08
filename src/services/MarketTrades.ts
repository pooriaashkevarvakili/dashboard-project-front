import api from "../api/axios";

export interface MarketTrades {
  key: number;
  name:string;
  amount:number
  price:number
  time:string
  isBayer:Boolean
}

interface ApiResponse {
  message: string;
  data: MarketTrades[];
}

export const getMarketTrades = async (): Promise<MarketTrades[]> => {
  const response = await api.get<ApiResponse>("/MarketTrade/all");
  return response.data.data;
};