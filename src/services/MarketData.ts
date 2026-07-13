import api from "../api/axios";

export interface MarketData {
  price:number,
      change24h: number,
      marketCap: number,
      volume24h: number,
      circulatingSupply: number,
      totalSupply: number,
      maxSupply: number,
      ath: number,
      athDate:string,
      atl: number,
      atlDate: string,
      dominance:number,
      rank: number
}

interface ApiResponse {
  message: string;
  data: MarketData[];
}

export const getMarketData = async (): Promise<MarketData[]> => {
  const response = await api.get<ApiResponse>("/marketData");


  return response.data.data;
};