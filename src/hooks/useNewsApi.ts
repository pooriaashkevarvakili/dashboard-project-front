import { useQuery } from "@tanstack/react-query";
import { getNews } from "../services/news";

export const useNewsApi = () => {
  const query = useQuery({
    queryKey: ["news"],
    queryFn: getNews,
  });

  return {
    dataThree: query.data ?? [],

  };
};