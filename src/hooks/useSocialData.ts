import { useQuery } from "@tanstack/react-query";
import { getSocialData } from "../services/SocialData";

export const useSocialData = () => {
  const query = useQuery({
    queryKey: ["socialData"],
    queryFn: getSocialData,
  });

  return {
    data: query.data?.data ?? [],
    message: query.data?.message ?? "",
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    isFetching: query.isFetching,
    refetch: query.refetch,
  };
};