import { useQuery } from "@tanstack/react-query";
import { getPriceChart } from "../services/chartSeries";
export const usePriceChart = () => {
  const query = useQuery({
    queryKey: ["priceChart"],
    queryFn: getPriceChart,
  });

  return {
    data: query.data ?? [],

  };
};