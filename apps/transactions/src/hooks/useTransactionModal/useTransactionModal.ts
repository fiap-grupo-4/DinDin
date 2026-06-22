import { useCallback } from 'react';
import type { TransactionActionKey } from '@/src/app/transactions/types';
import { closeModal, openModal } from '@/src/store/slices/transactionModalsSlice';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import useTransactionActions from '@/src/hooks/useTransactionActions/useTransactionActions';

export default function useTransactionModal(actionKey: TransactionActionKey) {
  const dispatch = useAppDispatch();
  const { isActionDisabled } = useTransactionActions();
  const isOpen = useAppSelector(
    (state) => state.transactionModals.openModalKey === actionKey
  );

  const open = useCallback(() => {
    if (isActionDisabled) return;
    dispatch(openModal(actionKey));
  }, [actionKey, dispatch, isActionDisabled]);

  const close = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  return { isOpen, open, close };
}
