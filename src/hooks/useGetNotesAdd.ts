import { useQuery } from "@tanstack/react-query";
import { getNotesAdd } from "../services/NotesAdd";
export const useNotesAdd = () => {
  const query = useQuery({
    queryKey: ["NotesAdd"],
    queryFn: getNotesAdd,
  });

  return {
    data: query.data ?? [],

  };
};