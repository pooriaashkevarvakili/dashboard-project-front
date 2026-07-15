import { useQuery } from "@tanstack/react-query";
import {getHoldersData} from '../services/holdersData'
export const useHoldersData = () => {
  const query = useQuery({
    queryKey: ["holdersData"],
    queryFn: getHoldersData,
  });

  return {
    data: query.data ?? [],

  };
};