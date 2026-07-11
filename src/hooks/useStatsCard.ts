import { useQuery } from "@tanstack/react-query";
import {getStatsCard} from '../services/StatsCards'
export const useStatsCard = () => {
  const query = useQuery({
    queryKey: ["statsCard"],
    queryFn: getStatsCard,
  });

  return {
    data: query.data ?? [],

  };
};