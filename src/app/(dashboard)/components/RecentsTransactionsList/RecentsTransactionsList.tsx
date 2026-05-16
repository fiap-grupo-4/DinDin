'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Transaction } from '@/src/types/transactions.types';
import { TransactionModal } from '@/src/components/features/TransactionModal';
import { TransactionList } from '@/src/components/features/TransactionList';
import { DeleteTransactionModal } from '@/src/components/features/DeleteTransactionModal';
import { transactionService } from '@/src/services/transactions';

interface RecentsTransactionsListProps {
  transactions: Transaction[];
}

export function RecentsTransactionsList({
  transactions,
}: RecentsTransactionsListProps) {
  const router = useRouter();

  const recentsTransactions =
    transactions.length > 5 ? transactions.slice(0, 5) : transactions;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const handleEditClick = (id: string) => {
    const transaction = transactions.find((t) => t.id === id) || null;
    setSelectedTransaction(transaction);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    const transaction = transactions.find((t) => t.id === id) || null;
    setSelectedTransaction(transaction);
    setIsDeleteModalOpen(true);
  };

  const handleSaveTransaction = async (updatedData: Partial<Transaction>) => {
    try {
      await transactionService.updateTransactions(updatedData);

      setIsEditModalOpen(false);
      router.refresh();
    } catch (error) {
      console.error('Erro ao editar transação:', error);
    }
  };

  const handleConfirmDelete = async (id: string) => {
    try {
      await transactionService.deleteTransactions(id);
      setIsDeleteModalOpen(false);
      router.refresh();
    } catch (error) {
      console.error('Erro ao excluir transação:', error);
    }
  };

  return (
    <>
      <TransactionList
        transactions={recentsTransactions}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />
      <TransactionModal
        key={`edit-${selectedTransaction?.id}`}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        defaultValues={selectedTransaction as Transaction}
        onSave={handleSaveTransaction}
      />

      {!!selectedTransaction && (
        <DeleteTransactionModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          description={selectedTransaction?.description}
          onConfirm={() => handleConfirmDelete(selectedTransaction.id)}
        />
      )}
    </>
  );
}
