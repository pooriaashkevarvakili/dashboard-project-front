import { useQuery } from "@tanstack/react-query";
import { getWalletFooter } from "../services/walletFooter";
import type { walletFooter } from "../services/walletFooter";

export const useWalletFooter = () => {
  const query = useQuery<walletFooter[]>({
    queryKey: ["walletFooter"],
    queryFn: getWalletFooter,
  });

  return {
    data: query.data ?? [],
  };
};