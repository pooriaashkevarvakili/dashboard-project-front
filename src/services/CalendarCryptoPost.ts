import api from '../api/axios';
import type { EventType } from '../types/CryptoEvent';

export interface CreateCalendarCryptoDto {
  title: string;
  description: string;
  eventDate: string; 
  type: EventType;
}

export const createCalendarCrypto = async (
  data: CreateCalendarCryptoDto,
) => {
  const { data: response } = await api.post('/calendar-crypto', data);
  return response;
};