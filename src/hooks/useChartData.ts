import { useQuery } from "@tanstack/react-query";
import { getChartData } from "../services/chartData";
export const useChartData = (symbol: string) => {
  return useQuery({
    queryKey: ["chart", symbol],
    queryFn: () => getChartData(symbol),
  });
};
