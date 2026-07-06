import { useQuery } from "@tanstack/react-query";
import { getCoinInterview, type coinInterview } from "../services/CoinInterview";

export const useCoinInterview = () => {
  return useQuery<coinInterview>({
    queryKey: ["coinInterview"],
    queryFn: async () => {
      const response = await getCoinInterview();
      return response[0];
    },
  });
};