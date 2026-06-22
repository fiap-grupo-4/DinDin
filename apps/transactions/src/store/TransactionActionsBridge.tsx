'use client';

import { useEffect, useRef, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import type { RunTransactionActionParams } from '@/src/app/transactions/types';
import {
  clearActionState,
  setActiveActionKey,
  setIsRefreshing,
} from './slices/transactionActionsSlice';
import { useAppDispatch, useAppSelector } from './hooks';
import { setRunActionImpl } from './runActionRegistry';

const LOADING_CLEAR_FALLBACK_MS = 8000;

export default function TransactionActionsBridge() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isRefreshing = useAppSelector(
    (state) => state.transactionActions.isRefreshing
  );
  const [isPending, startTransition] = useTransition();
  const loadingClearFallbackRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const clearLoadingFallback = () => {
    if (loadingClearFallbackRef.current) {
      clearTimeout(loadingClearFallbackRef.current);
      loadingClearFallbackRef.current = null;
    }
  };

  useEffect(() => {
    if (!isPending && isRefreshing) {
      clearLoadingFallback();
      dispatch(clearActionState());
    }
  }, [dispatch, isPending, isRefreshing]);

  useEffect(() => {
    return () => clearLoadingFallback();
  }, []);

  useEffect(() => {
    const runAction = async ({
      actionKey,
      action,
      successMessage,
      errorMessage,
      onSuccess,
    }: RunTransactionActionParams) => {
      dispatch(setActiveActionKey(actionKey));

      try {
        const result = await action();

        if (!result.success) {
          toast.error(result.error ?? errorMessage);
          dispatch(setActiveActionKey(null));
          return;
        }

        toast.success(successMessage);
        onSuccess?.();
        dispatch(setIsRefreshing(true));

        clearLoadingFallback();
        loadingClearFallbackRef.current = setTimeout(() => {
          dispatch(clearActionState());
          loadingClearFallbackRef.current = null;
        }, LOADING_CLEAR_FALLBACK_MS);

        startTransition(() => {
          router.refresh();
        });
      } catch {
        toast.error(errorMessage);
        dispatch(setActiveActionKey(null));
      }
    };

    setRunActionImpl(runAction);

    return () => setRunActionImpl(null);
  }, [dispatch, router]);

  return null;
}
