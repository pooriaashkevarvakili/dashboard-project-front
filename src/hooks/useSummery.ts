import { useQuery } from "@tanstack/react-query";
import { getSummery } from "../services/summery";
import type { Summery } from "../services/summery";

export const useSummery = () => {
  return useQuery<Summery>({
    queryKey: ["summery"],
    queryFn: getSummery,
  });
};