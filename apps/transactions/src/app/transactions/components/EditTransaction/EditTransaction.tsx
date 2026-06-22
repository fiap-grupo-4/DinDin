'use client';

import { Icon } from '@dindin/ui';
import { Transaction } from '@/types/transactions.types';
import { TransactionModal } from '@/src/components/TransactionModal';
import { editTransactionAction } from '@/src/app/transactions/actions';
import {
  TRANSACTION_TOAST_MESSAGES,
  getEditActionKey,
} from '@/src/app/transactions/types';
import { useTransactionActions } from '@/src/hooks/useTransactionActions';
import { useTransactionModal } from '@/src/hooks/useTransactionModal';

interface EditTransactionProps {
  transaction: Transaction;
}

export default function EditTransaction({ transaction }: EditTransactionProps) {
  const { isActionDisabled, isActionLoading, runAction } =
    useTransactionActions();
  const actionKey = getEditActionKey(transaction.id);
  const { isOpen, open, close } = useTransactionModal(actionKey);
  const isSubmitting = isActionLoading(actionKey);

  const handleSave = async (data: Partial<Transaction>) => {
    await runAction({
      actionKey,
      action: () => editTransactionAction(data),
      successMessage: TRANSACTION_TOAST_MESSAGES.edit.success,
      errorMessage: TRANSACTION_TOAST_MESSAGES.edit.error,
      onSuccess: close,
    });
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        disabled={isActionDisabled}
        aria-label="Editar transação"
        aria-busy={isSubmitting}
        className="disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Icon
          name="PencilLine"
          size={20}
          className={`text-gray-700 hover:text-gray-800 ${isSubmitting ? 'animate-pulse' : ''}`}
        />
      </button>
      <TransactionModal
        key={`edit-${transaction.id}`}
        isOpen={isOpen}
        onClose={close}
        defaultValues={transaction}
        onSave={handleSave}
        isSubmitting={isSubmitting}
        isActionsDisabled={isActionDisabled}
      />
    </>
  );
}
