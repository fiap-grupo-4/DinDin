'use client';

import { useState } from 'react';
import { Button } from '@dindin/ui';
import { Transaction } from '@/types/transactions.types';
import { TransactionModal } from '@/src/components/TransactionModal';
import { createTransactionAction } from '@/src/app/transactions/actions';
import { TRANSACTION_TOAST_MESSAGES } from '@/src/app/transactions/types';
import { useTransactionActions } from '@/src/context';

const ACTION_KEY = 'create' as const;

export default function CreateTransaction() {
  const { isActionDisabled, isActionLoading, runAction } =
    useTransactionActions();
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = async (data: Partial<Transaction>) => {
    await runAction({
      actionKey: ACTION_KEY,
      action: () => createTransactionAction(data),
      successMessage: TRANSACTION_TOAST_MESSAGES.create.success,
      errorMessage: TRANSACTION_TOAST_MESSAGES.create.error,
      onSuccess: () => setIsOpen(false),
    });
  };

  const handleOpen = () => {
    if (isActionDisabled) return;
    setIsOpen(true);
  };

  return (
    <>
      <Button
        label="Nova Transação"
        size="sm"
        icon="AddLine"
        onClick={handleOpen}
        disabled={isActionDisabled}
        className="w-full md:w-fit"
      />
      <TransactionModal
        key="create-new"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleSave}
        isSubmitting={isActionLoading(ACTION_KEY)}
        isActionsDisabled={isActionDisabled}
      />
    </>
  );
}
