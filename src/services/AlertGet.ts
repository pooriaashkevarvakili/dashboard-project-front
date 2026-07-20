import api from "../api/axios";

export interface AlertGet {
  symbol: string;
  indicator: string;
  condition: string;
  value: number;
    icon: string;

}

export const getAlertGet = async (): Promise<AlertGet[]> => {
  const response = await api.get("/chart-alert/alerts");
  if (Array.isArray(response.data)) {
    return response.data;
  }
  if (response.data && Array.isArray(response.data.data)) {
    return response.data.data;
  }
  return [];
};