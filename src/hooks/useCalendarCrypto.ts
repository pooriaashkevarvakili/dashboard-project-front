import { useQuery } from '@tanstack/react-query';
import { getCalendarCrypto } from '../services/calendarCryptoGet';
import type { CalendarEventsResponse } from '../services/calendarCryptoGet';

export const useCalendarCrypto = () => {
  return useQuery<CalendarEventsResponse>({
    queryKey: ['calendar-crypto'],
    queryFn: async () => {
      console.log('📡 ارسال درخواست...');
      try {
        const result = await getCalendarCrypto();
        console.log('✅ دریافت شد:', result);
        return result;
      } catch (err) {
        console.error('❌ خطا در fetch:', err);
        throw err; // مهم: خطا را برای useQuery پرتاب کنید
      }
    },
    staleTime: 0,
    retry: 1,
    // ❌ onError و onSuccess حذف شدند
  });
};