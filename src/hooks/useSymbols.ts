import { useQuery } from "@tanstack/react-query";
import {  getSymbols } from "../services/SymbolsData";

export const useSymbols = () => {
  return useQuery({
    queryKey: ["symbols"],
    queryFn: getSymbols,
  });
};