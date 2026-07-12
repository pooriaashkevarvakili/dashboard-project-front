import { useQuery } from "@tanstack/react-query";
import { getCryptomarkets } from "../services/cryptoMarket";

export const useCryptomarket = (
  page: number,
  limit: number
) => {
  const query = useQuery({
    queryKey: ["cryptomarket", page, limit],
    queryFn: () => getCryptomarkets(page, limit),
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