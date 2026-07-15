import { useQuery } from "@tanstack/react-query";
import { getRecentTransactions } from "../services/recentTransactions";

export const useRecentTransactions = () => {
  const query = useQuery({
    queryKey: ["recentTransactions"],
    queryFn: getRecentTransactions,
  });

  return {
    data: query.data?.data ?? [],
    message: query.data?.message,
    isLoading: query.isLoading,
  };
};