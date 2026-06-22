import { useSensitiveAmountContext } from '@/src/context/SensitiveAmountProvider';

export function useSensitiveAmount() {
  return useSensitiveAmountContext();
}
