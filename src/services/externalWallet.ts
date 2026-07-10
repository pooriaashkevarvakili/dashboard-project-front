import api from "../api/axios";

export interface ExternalWallet {
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
  address:string
}

interface ApiResponse {
  message: string;
  data: ExternalWallet[];
}

export const getExternalnalWallet = async (): Promise<ApiResponse> => {
  const response = await api.get<ApiResponse>("/externalnalWallet/all");
  return response.data;
};