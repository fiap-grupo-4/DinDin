'use client';

import { Icon } from '@dindin/ui';
import { Transaction } from '@/types/transactions.types';
import { DeleteTransactionModal } from '@/src/components/DeleteTransactionModal';
import { deleteTransactionAction } from '@/src/app/transactions/actions';
import {
  TRANSACTION_TOAST_MESSAGES,
  getDeleteActionKey,
} from '@/src/app/transactions/types';
import { useTransactionActions } from '@/src/hooks/useTransactionActions';
import { useTransactionModal } from '@/src/hooks/useTransactionModal';

interface DeleteTransactionProps {
  transaction: Transaction;
}

export default function DeleteTransaction({
  transaction,
}: DeleteTransactionProps) {
  const { isActionDisabled, isActionLoading, runAction } =
    useTransactionActions();
  const actionKey = getDeleteActionKey(transaction.id);
  const { isOpen, open, close } = useTransactionModal(actionKey);
  const isSubmitting = isActionLoading(actionKey);

  const handleConfirm = async () => {
    await runAction({
      actionKey,
      action: () => deleteTransactionAction(transaction.id),
      successMessage: TRANSACTION_TOAST_MESSAGES.delete.success,
      errorMessage: TRANSACTION_TOAST_MESSAGES.delete.error,
      onSuccess: close,
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        disabled={isActionDisabled}
        aria-label="Excluir transação"
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
        onClose={close}
        onConfirm={handleConfirm}
        isSubmitting={isSubmitting}
        isActionsDisabled={isActionDisabled}
      />
    </>
  );
}
