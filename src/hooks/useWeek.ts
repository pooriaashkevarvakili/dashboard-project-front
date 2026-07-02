import { useQuery } from "@tanstack/react-query";
import { getWeek } from "../services/week";
export const useWeek = () => {
  const query = useQuery({
    queryKey: ["week"],
    queryFn: getWeek,
  });

  return {
    data: query.data ?? [],
    isLoadingFour: query.isLoading,
    isErrorFour: query.isError,
  };
};