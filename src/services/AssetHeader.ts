import api from "../api/axios";

export interface AssetHeader {
  key: number;
  title:string;
  tag:string
  avatar:string
}

interface ApiResponse {
  message: string;
  data: AssetHeader[];
}

export const getAssetHeader = async (): Promise<AssetHeader[]> => {
  const response = await api.get<ApiResponse>("/AssetHeader");


  return response.data.data;
};