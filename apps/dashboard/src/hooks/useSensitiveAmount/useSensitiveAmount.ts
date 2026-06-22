import { useCallback } from 'react';
import { toggleShowSensitiveAmount } from '@/src/store/slices/sensitiveAmountSlice';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';

export function useSensitiveAmount() {
  const dispatch = useAppDispatch();
  const showSensitiveAmount = useAppSelector(
    (state) => state.sensitiveAmount.showSensitiveAmount
  );

  const toggle = useCallback(() => {
    dispatch(toggleShowSensitiveAmount());
  }, [dispatch]);

  return {
    showSensitiveAmount,
    toggleShowSensitiveAmount: toggle,
  };
}
