'use client';

import { useState } from 'react';
import { Icon } from '@dindin/ui';
import { Transaction } from '@/types/transactions.types';
import { DeleteTransactionModal } from '@/src/components/DeleteTransactionModal';
import { deleteTransactionAction } from '@/src/app/transactions/actions';
import {
  TRANSACTION_TOAST_MESSAGES,
  getDeleteActionKey,
} from '@/src/app/transactions/types';
import { useTransactionActions } from '@/src/context';

interface DeleteTransactionProps {
  transaction: Transaction;
}

export default function DeleteTransaction({
  transaction,
}: DeleteTransactionProps) {
  const { isActionDisabled, isActionLoading, runAction } =
    useTransactionActions();
  const [isOpen, setIsOpen] = useState(false);
  const actionKey = getDeleteActionKey(transaction.id);
  const isSubmitting = isActionLoading(actionKey);

  const handleConfirm = async () => {
    await runAction({
      actionKey,
      action: () => deleteTransactionAction(transaction.id),
      successMessage: TRANSACTION_TOAST_MESSAGES.delete.success,
      errorMessage: TRANSACTION_TOAST_MESSAGES.delete.error,
      onSuccess: () => setIsOpen(false),
    });
  };

  const handleOpen = () => {
    if (isActionDisabled) return;
    setIsOpen(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        disabled={isActionDisabled}
        aria-busy={isSubmitting}
        className="disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Icon
          name="DeleteBin6Line"
          size={20}
          className={`text-danger-400 hover:text-danger-600 ${isSubmitting ? 'animate-pulse' : ''}`}
        />
      </button>
      <DeleteTransactionModal
        isOpen={isOpen}
        description={transaction.description}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirm}
        isSubmitting={isSubmitting}
        isActionsDisabled={isActionDisabled}
      />
    </>
  );
}
