import api from "../api/axios";

export interface profileSummeryTimeline {
  key: number;
  title: string;
  value:string;
  color:string
}

interface ApiResponse {
  message: string;
  data: profileSummeryTimeline[];
}

export const getProfileSummeryTimeline = async (): Promise<profileSummeryTimeline[]> => {
  const response = await api.get<ApiResponse>("/performanceSummaryTimeline");


  return response.data.data;
};