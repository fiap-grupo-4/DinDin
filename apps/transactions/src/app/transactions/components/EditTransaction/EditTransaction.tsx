'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@dindin/ui';
import { Transaction } from '@/types/transactions.types';
import { TransactionModal } from '@/src/components/TransactionModal';
import { editTransactionAction } from '@/src/app/transactions/actions';

interface EditTransactionProps {
  transaction: Transaction;
}

export default function EditTransaction({ transaction }: EditTransactionProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = async (data: Partial<Transaction>) => {
    const result = await editTransactionAction(data);

    if (!result.success) return;

    setIsOpen(false);
    router.refresh();
  };

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        <Icon
          name="PencilLine"
          size={20}
          className="text-gray-700 hover:text-gray-800"
        />
      </button>
      <TransactionModal
        key={`edit-${transaction.id}`}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        defaultValues={transaction}
        onSave={handleSave}
      />
    </>
  );
}
