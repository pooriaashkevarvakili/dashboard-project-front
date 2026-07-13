import { useQuery } from "@tanstack/react-query";
import { getChartCoinData } from "../services/ChartsCoinData";
import type { Timeframe } from "../pages/Components/Coin/data/types";

export const useChartsCoinData = (timeframe: Timeframe) => {
  return useQuery({
    queryKey: ["ChartCoinData", timeframe],
    queryFn: () => getChartCoinData(timeframe),
  });
};