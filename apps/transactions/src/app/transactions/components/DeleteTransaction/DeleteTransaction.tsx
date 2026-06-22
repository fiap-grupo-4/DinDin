'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@dindin/ui';
import { Transaction } from '@/types/transactions.types';
import { DeleteTransactionModal } from '@/src/components/DeleteTransactionModal';
import { deleteTransactionAction } from '@/src/app/transactions/actions';

interface DeleteTransactionProps {
  transaction: Transaction;
}

export default function DeleteTransaction({
  transaction,
}: DeleteTransactionProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = async () => {
    const result = await deleteTransactionAction(transaction.id);

    if (!result.success) return;

    setIsOpen(false);
    router.refresh();
  };

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        <Icon
          name="DeleteBin6Line"
          size={20}
          className="text-danger-400 hover:text-danger-600"
        />
      </button>
      <DeleteTransactionModal
        isOpen={isOpen}
        description={transaction.description}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirm}
      />
    </>
  );
}
