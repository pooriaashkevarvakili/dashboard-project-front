import api from "../api/axios";

export interface coinInterview {
  key: number;
  symbol: string;
  name:string;
  rank:number
  currentPrice:number
  change24h:number
  high24h:number
  low24h:number
  totalSupply:string
  marketCap:string
}

interface ApiResponse {
  message: string;
  data: coinInterview[];
}

export const getCoinInterview = async (): Promise<coinInterview[]> => {
  const response = await api.get<ApiResponse>("/coinInterview");
  return response.data.data;
};