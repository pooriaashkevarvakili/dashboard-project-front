import api from "../api/axios";

export interface CurrencyExchange {
  symbol:string,
      baseAsset: string,
      quoteAsset: string,
      icon:string,
      lastPrice:number,
      priceChange: number,
      priceChangePercent:number,
priceChangeDirection: "up" | "down";      high24h: number,
      low24h: number,
      volume24h: number,
      volumeUnit: string,
      status: string
}

interface ApiResponse {
  message: string;
  data: CurrencyExchange[];
}

export const getCurrencyExchange = async (): Promise<CurrencyExchange[]> => {
  const response = await api.get<ApiResponse>("/currencyExchange");


  return response.data.data;
};