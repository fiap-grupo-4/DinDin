'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
  type ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import type {
  RunTransactionActionParams,
  TransactionActionKey,
} from '@/src/app/transactions/types';

interface TransactionActionsContextValue {
  isPending: boolean;
  isLoading: boolean;
  isActionDisabled: boolean;
  isActionLoading: (actionKey: TransactionActionKey) => boolean;
  runAction: (params: RunTransactionActionParams) => Promise<void>;
}

const TransactionActionsContext =
  createContext<TransactionActionsContextValue | null>(null);

export default function TransactionActionsProvider({
  children,
}: {
  children: ReactNode;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [activeActionKey, setActiveActionKey] =
    useState<TransactionActionKey | null>(null);
  const isRefreshingRef = useRef(false);

  const isLoading = activeActionKey !== null || isPending;

  useEffect(() => {
    if (!isPending && isRefreshingRef.current) {
      isRefreshingRef.current = false;
      setActiveActionKey(null);
    }
  }, [isPending]);

  const runAction = useCallback(
    async ({
      actionKey,
      action,
      successMessage,
      errorMessage,
      onSuccess,
    }: RunTransactionActionParams) => {
      setActiveActionKey(actionKey);

      try {
        const result = await action();

        if (!result.success) {
          toast.error(result.error ?? errorMessage);
          setActiveActionKey(null);
          return;
        }

        toast.success(successMessage);
        onSuccess?.();
        isRefreshingRef.current = true;

        startTransition(() => {
          router.refresh();
        });
      } catch {
        toast.error(errorMessage);
        setActiveActionKey(null);
      }
    },
    [router]
  );

  const value = useMemo(
    () => ({
      isPending,
      isLoading,
      isActionDisabled: isLoading,
      isActionLoading: (actionKey: TransactionActionKey) =>
        activeActionKey === actionKey,
      runAction,
    }),
    [isPending, isLoading, activeActionKey, runAction]
  );

  return (
    <TransactionActionsContext.Provider value={value}>
      {children}
    </TransactionActionsContext.Provider>
  );
}

export function useTransactionActions() {
  const context = useContext(TransactionActionsContext);

  if (!context) {
    throw new Error(
      'useTransactionActions must be used within TransactionActionsProvider'
    );
  }

  return context;
}
