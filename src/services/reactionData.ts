import api from "../api/axios";

export interface reactionData {
   likes: number,
      dislikes: number,
      shares:number,
      bookmarks: number
}

interface ApiResponse {
  message: string;
  data: reactionData[];
}

export const getReactionData = async (): Promise<reactionData[]> => {
  const response = await api.get<ApiResponse>("/reactionData");


  return response.data.data;
};