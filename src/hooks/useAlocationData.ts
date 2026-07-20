import { useQuery } from "@tanstack/react-query";
import { getAlocationData } from "../services/alocationData";
export const useAlocationData = () => {
  const query = useQuery({
    queryKey: ["alocationData"],
    queryFn: getAlocationData,
  });

  return {
    data: query.data ?? [],
   
  };
};