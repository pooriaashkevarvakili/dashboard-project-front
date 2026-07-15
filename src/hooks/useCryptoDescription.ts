import { useQuery } from "@tanstack/react-query";
import { getcryptoDescription } from "../services/cryptoDescrioption";
export const useCryptoDescription = () => {
  const query = useQuery({
    queryKey: ["cryptoDescription"],
    queryFn: getcryptoDescription,
  });

  return {
    data: query.data ?? [],

  };
};