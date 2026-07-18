import api from '../api/axios';
import type { EventType } from '../types/CryptoEvent';

export interface CalendarEventsResponse {
  success: boolean;
  data: Record<
    string,
    {
      id: number;
      title: string;
      description: string;
      type: EventType;
    }[]
  >;
}

export const getCalendarCrypto = async (): Promise<CalendarEventsResponse> => {
  const { data } = await api.get('/calendar-crypto');
  return data;
};