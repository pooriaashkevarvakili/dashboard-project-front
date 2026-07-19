import api from "../api/axios";

export interface AlertGet {
  symbol: string;
  indicator: string;
  condition: string;
  value: number;
}

export const getAlertGet = async (): Promise<AlertGet[]> => {
  const response = await api.get("/chart-alert/alerts");
  // اگر پاسخ یک آرایه است
  if (Array.isArray(response.data)) {
    return response.data;
  }
  // اگر پاسخ دارای کلید data است
  if (response.data && Array.isArray(response.data.data)) {
    return response.data.data;
  }
  // در غیر این صورت آرایه خالی برگردانید
  return [];
};