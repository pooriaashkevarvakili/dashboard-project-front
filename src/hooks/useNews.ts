import { useQuery } from "@tanstack/react-query";
import { getNews } from "../services/news";

export const useNews = () => {
  const query = useQuery({
    queryKey: ["news"],
    queryFn: getNews,
  });

  return {
    dataThree: query.data ?? [],
    isLoadingThree: query.isLoading,
    isErrorThree: query.isError,
  };
};