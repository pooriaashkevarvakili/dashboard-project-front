import { useQuery } from "@tanstack/react-query";
import {getStats} from '../services/stats'
export const useStats = () => {
  const query = useQuery({
    queryKey: ["stats"],
    queryFn: getStats,
  });

  return {
    data: query.data ?? [],

  };
};