import { useQuery } from "@tanstack/react-query";
import { getExternalnalWallet } from "../services/externalWallet";
export const useExternalWallet = () => {
  const query = useQuery({
    queryKey: ["externalWallet"],
    queryFn: getExternalnalWallet,
  });

  return {
      data: query.data?.data ?? [],
    isLoading: query.isLoading,
    error: query.error,

  };
};