import api from "../api/axios";

export interface progressAssetDetails {
  key: number;
  currency:number;
  TotalInvested:number
  color:string;
  CurrentValue:number
}

interface ApiResponse {
  message: string;
  data: progressAssetDetails[];
}

export const getProgressAssetDetails = async (): Promise<progressAssetDetails[]> => {
  const response = await api.get<ApiResponse>("/progressAssetDetails");


  return response.data.data;
};