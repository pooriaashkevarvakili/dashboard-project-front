import { useQuery } from '@tanstack/react-query';
import { getCalendarCrypto } from '../services/calendarCryptoGet';
import type { CalendarEventsResponse } from '../services/calendarCryptoGet';

export const useCalendarCrypto = () => {
  return useQuery<CalendarEventsResponse>({
    queryKey: ['calendar-crypto'],
    queryFn: async () => {
      try {
        const result = await getCalendarCrypto();
        return result;
      } catch (err) {
        throw err; 
      }
    },
    staleTime: 0,
    retry: 1,
  });
};