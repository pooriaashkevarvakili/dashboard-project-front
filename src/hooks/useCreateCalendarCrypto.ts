import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCalendarCrypto } from '../services/CalendarCryptoPost';

export const useCreateCalendarCrypto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCalendarCrypto,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['calendar-crypto'],
      });
    },
  });
};