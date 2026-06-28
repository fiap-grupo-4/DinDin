'use client';

import { Button } from '@dindin/ui';
import { Transaction } from '@/types/transactions.types';
import { TransactionModal } from '@/src/components/TransactionModal';
import { createTransactionAction } from '@/src/app/transactions/actions';
import { useTransactionActions } from '@/src/hooks/useTransactionActions';
import { useTransactionModal } from '@/src/hooks/useTransactionModal';
import { TRANSACTION_TOAST_MESSAGES } from '@/src/lib/constants/transaction';

const ACTION_KEY = 'create' as const;

export default function CreateTransaction() {
  const { isActionDisabled, isActionLoading, runAction } =
    useTransactionActions();
  const { isOpen, open, close } = useTransactionModal(ACTION_KEY);

  const handleSave = async (data: Partial<Transaction>) => {
    await runAction({
      actionKey: ACTION_KEY,
      action: () => createTransactionAction(data),
      successMessage: TRANSACTION_TOAST_MESSAGES.create.success,
      errorMessage: TRANSACTION_TOAST_MESSAGES.create.error,
      onSuccess: close,
    });
  };

  return (
    <>
      <Button
        label="Nova Transação"
        size="sm"
        icon="AddLine"
        onClick={open}
        disabled={isActionDisabled}
        className="w-full md:w-fit"
      />
      <TransactionModal
        key="create-new"
        isOpen={isOpen}
        onClose={close}
        onSave={handleSave}
        isSubmitting={isActionLoading(ACTION_KEY)}
        isActionsDisabled={isActionDisabled}
      />
    </>
  );
}
