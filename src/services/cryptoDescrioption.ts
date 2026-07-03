import api from "../api/axios";

export interface cryptoDescription {
  key: number;
  title: string;
  price:number;
  priceOne:number
  icon:string
}

interface ApiResponse {
  message: string;
  data: cryptoDescription[];
}

export const getcryptoDescription = async (): Promise<cryptoDescription[]> => {
  const response = await api.get<ApiResponse>("/cryptoDescription");

  console.log("NEWS RESPONSE:", response.data);

  return response.data.data;
};