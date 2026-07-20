import { useQuery } from "@tanstack/react-query";
import { getAlertGet } from "../services/AlertGet";
import type { Alert, Indicator, Condition } from "../types/Alert";

export const useAlertGet = () => {
  const query = useQuery({
    queryKey: ["alertGet"],
    queryFn: getAlertGet,
    retry: 1,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const dataWithId: Alert[] = query.data?.map((item) => ({
    symbol: item.symbol,
    indicator: item.indicator as Indicator, 
    condition: item.condition as Condition, 
    value: item.value,
       icon: item.icon,

  })) ?? [];

  return {
    data: dataWithId,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    isSuccess: query.isSuccess,
    isFetching: query.isFetching,
  };
};