import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

interface CoinData {
  key: string;
  name: string;
  symbol: string;
  price: number;
  changePercent: number;
  alert: boolean;
  sparklineData: number[];
}

export const useCryptoTables = () => {
  return useQuery<CoinData[]>({
    queryKey: ["cryptoPriceTable"],
    queryFn: async () => {
      const { data } = await api.get("/cryptoTables/all");

      return data.data.map((item: any) => ({
        key: item.key,
        name: item.name,
        symbol: item.symbol,
        price: Number(item.price),
        changePercent: Number(item.changePercent),
        alert: Boolean(item.alert),
        sparklineData: item.sparklineData.map((x: string) => Number(x)),
      }));
    },
  });
};