import api from "../api/axios";

export interface FuturesAsset {
 id:number

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
  data: FuturesAsset[];
}

export const getFutureAsset = async (): Promise<ApiResponse> => {
  const response = await api.get<ApiResponse>("/futuresAsset/all");
  return response.data;
};