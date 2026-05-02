'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Transaction } from '@/src/types/transactions.types';
import { Container } from '../../ui/Container';
import { Heading } from '../../ui/Heading';
import { ItemList } from '../../ui/ItemList';
import { Link } from '../../ui/Link';

import { EditTransactionModal } from '../TransactionModal/EditTransaction';
import { DeleteTransactionModal } from '../TransactionModal/DeleteTransaction';
import { transactionService } from '@/src/services/transactions';

interface RecentsTransactionsCardProps {
  transactions: Transaction[];
}

export function RecentsTransactionsCard({
  transactions,
}: RecentsTransactionsCardProps) {
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

  const handleSaveTransaction = async (
    id: string,
    updatedData: Partial<Transaction>
  ) => {
    try {
      await transactionService.updateTransactions(id, updatedData);

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
    <Container>
      <Heading title="Transações Recentes" className="mb-11" />
      <ul className="flex flex-col gap-5">
        {recentsTransactions.map((transaction) => (
          <ItemList
            key={transaction.id}
            id={transaction.id}
            value={transaction.value}
            date={transaction.createdAt}
            kind={transaction.transactionType}
            description={transaction.description}
            onEditItem={() => handleEditClick(transaction.id)}
            onDeleteItem={() => handleDeleteClick(transaction.id)}
          />
        ))}
      </ul>
      <Link
        label="Veja Mais"
        iconRight="ArrowRightSLine"
        href="/transactions"
        className="mt-10 w-fit ml-auto"
      />

      <EditTransactionModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        transaction={selectedTransaction}
        onSave={handleSaveTransaction}
      />

      <DeleteTransactionModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        transaction={selectedTransaction}
        onConfirm={handleConfirmDelete}
      />
    </Container>
  );
}
