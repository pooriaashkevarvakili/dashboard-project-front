import { useQuery } from "@tanstack/react-query";
import { getNews, getNewsById } from "../services/newsCrypto";

export const useNews = () => {
  return useQuery({
    queryKey: ["news"],
    queryFn: getNews,
  });
};

export const useNewsById = (id: number) => {
  return useQuery({
    queryKey: ["news", id],
    queryFn: () => getNewsById(id),
    enabled: !!id,
  });
};