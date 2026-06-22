'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@dindin/ui';
import { Transaction } from '@/types/transactions.types';
import { TransactionModal } from '@/src/components/TransactionModal';
import { createTransactionAction } from '@/src/app/transactions/actions';

export default function CreateTransaction() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = async (data: Partial<Transaction>) => {
    const result = await createTransactionAction(data);

    if (!result.success) return;

    setIsOpen(false);
    router.refresh();
  };

  return (
    <>
      <Button
        label="Nova Transação"
        size="sm"
        icon="AddLine"
        onClick={() => setIsOpen(true)}
        className="w-full md:w-fit"
      />
      <TransactionModal
        key="create-new"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleSave}
      />
    </>
  );
}
