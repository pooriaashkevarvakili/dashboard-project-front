import api from "../api/axios";

export interface NotesAdd {
  id: number;
  title: string;
  content: string;
  color: string;
}

interface ApiResponse {
  message: string;
  data: NotesAdd[];
}

export const getNotesAdd = async (): Promise<NotesAdd[]> => {
  const response = await api.get<ApiResponse>("/NoteTitle");

  return response.data.data;
};
