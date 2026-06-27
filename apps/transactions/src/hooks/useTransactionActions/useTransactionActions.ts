import { useCallback } from 'react';
import type {
  TransactionActionKey,
  RunTransactionActionParams,
} from '@/src/app/transactions/types';
import { useAppSelector } from '@/src/store/hooks';
import { getRunActionImpl } from '@/src/store/runActionRegistry';

export default function useTransactionActions() {
  const activeActionKey = useAppSelector(
    (state) => state.transactionActions.activeActionKey
  );
  const isRefreshing = useAppSelector(
    (state) => state.transactionActions.isRefreshing
  );
  const isLoading = activeActionKey !== null || isRefreshing;

  const runAction = useCallback(async (params: RunTransactionActionParams) => {
    const runActionImpl = getRunActionImpl();

    if (!runActionImpl) {
      throw new Error(
        'useTransactionActions must be used within StoreProvider'
      );
    }

    await runActionImpl(params);
  }, []);

  const isActionLoading = useCallback(
    (actionKey: TransactionActionKey) => activeActionKey === actionKey,
    [activeActionKey]
  );

  return {
    isPending: isRefreshing,
    isLoading,
    isActionDisabled: isLoading,
    isActionLoading,
    runAction,
  };
}
