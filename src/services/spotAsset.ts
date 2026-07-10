import api from "../api/axios";

export interface SpotAsset {
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
  data: SpotAsset[];
}

export const getSpotAsset = async (): Promise<ApiResponse> => {
  const response = await api.get<ApiResponse>("/spotasset/all");
  return response.data;
};