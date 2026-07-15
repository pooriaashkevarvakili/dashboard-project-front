import api from "../api/axios";

export interface OrderHistoryTable {
  name: string,

        type: string,
        price:string,
        amount: string,
        total: number,
        status: boolean,
        time: string,
}

interface ApiResponse {
  message: string;
  data: OrderHistoryTable[];
}

export const getOrderHistoryTable = async (): Promise<OrderHistoryTable[]> => {
  const response = await api.get<ApiResponse>("/orderHistoryTable/all");


  return response.data.data;
};