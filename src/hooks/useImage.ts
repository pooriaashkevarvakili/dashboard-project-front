import { useQuery } from "@tanstack/react-query";
import getImage  from "../services/image.services";

export const useImage = () => {
  return useQuery({
    queryKey: ["image"],
    queryFn: getImage,
  });
};