import { useQuery } from "@tanstack/react-query";
import {getReactionData} from '../services/reactionData'
export const useReactionData = () => {
  return useQuery({
    queryKey: ["reactionData"],
    queryFn: getReactionData,
    select: (data) => data[0],
  });
};