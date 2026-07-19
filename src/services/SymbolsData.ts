import api from "../api/axios";


export const getSymbols = async (): Promise<string[]> => {
  const response = await api.get<string[]>("/chart-alert/symbols");

  console.log("FULL RESPONSE DATA:", response.data);

  return response.data;
};