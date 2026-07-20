import { useQuery } from "@tanstack/react-query";
import { getMonth } from "../services/Month";
export const useMonth = () => {
  const query = useQuery({
    queryKey: ["month"],
    queryFn: getMonth,
  });

  return {
    data: query.data ?? [],
   
  };
};