import { useQuery } from "@tanstack/react-query";
import {getChartCoin} from '../services/ChartCoin'
export const useChartsCoin = () => {
  const query = useQuery({
    queryKey: ["chartsCoin"],
    queryFn: getChartCoin,
  });

  return {
    data: query.data ?? [],

  };
};