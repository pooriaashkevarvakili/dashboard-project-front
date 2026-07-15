


import { useQuery } from "@tanstack/react-query";
import { getTranactions } from "../services/transactions";

export const useTransactions = () => {
  const query = useQuery({
    queryKey: ["transactions"],
    queryFn: getTranactions,
    staleTime: 1000 * 60 * 5,
  });

  return {
    ...query,
    dataTwo: query.data,
    
  };
};