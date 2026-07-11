import api from "../api/axios";

export interface Transaction {
  id: number;
  coin: string;
  type: "deposit" | "withdraw" | "buy" | "sell" | "swap";
  amount: number;
  txId: string;
  address: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionFilters {
  search?: string;
  type?: string;
  coin?: string;
  from?: string;
  to?: string;
}

export const getTransactionsFilter = async (
  filters: TransactionFilters
): Promise<Transaction[]> => {
  const response = await api.get<Transaction[]>(
    "/filter-transaction/search",
    {
      params: filters,
    }
  );

  console.log("API Response:", response.data);

  return response.data.map((item) => ({
    ...item,
    amount: Number(item.amount),
  }));
};