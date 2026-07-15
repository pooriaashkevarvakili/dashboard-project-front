import { useQuery } from "@tanstack/react-query";
import {getholdersTabAddress} from '../services/HoldersTabAddress'
export const useHoldersTabAddress = () => {
  const query = useQuery({
    queryKey: ["holdersTabAddress"],
    queryFn: getholdersTabAddress,
  });

  return {
    data: query.data ?? [],

  };
};