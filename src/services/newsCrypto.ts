// src/api/newsApi.ts
import api from "../api/axios";
import type { NewsItem } from "../pages/Components/News/data/types";


export const getNews = async (): Promise<NewsItem[]> => {
  try {
    const response = await api.get<NewsItem[]>("/crypto-news");
    return response.data;
  } catch (error) {
    console.error("Error fetching news:", error);
    // در صورت خطا، آرایه خالی برگردانید یا یک پیام خطا پرتاب کنید
    throw new Error("Failed to load news");
  }
};


export const getNewsById = async (id: number): Promise<NewsItem> => {
  try {
    const response = await api.get<NewsItem>("/crypto-news/get", {
      params: { id },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching news with id ${id}:`, error);
    throw new Error(`Failed to load news with id ${id}`);
  }
};
