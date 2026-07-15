import { useQuery } from "@tanstack/react-query";
import { getProfileSummeryTimeline } from "../services/profileSummeryTimeline";
export const useProfileSummeryTimeline = () => {
  const query = useQuery({
    queryKey: ["profileSummeryTimeline"],
    queryFn: getProfileSummeryTimeline,
  });

  return {
    data: query.data ?? [],

  };
};