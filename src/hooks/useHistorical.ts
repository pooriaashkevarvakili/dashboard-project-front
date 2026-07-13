import { useQuery } from "@tanstack/react-query";
import { getHistorical } from "../services/historical";

export const useHistorical = (
  page: number,
  limit: number
) => {
  const query = useQuery({
    queryKey: ["historical", page, limit],
    queryFn: () => getHistorical(page, limit),
  });

  return {
    data: query.data?.data ?? [],
    pagination: query.data?.pagination,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
};