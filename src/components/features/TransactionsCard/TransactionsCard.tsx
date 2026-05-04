'use client';

import { Transaction, TransactionType } from '@/src/types/transactions.types';
import { Container } from '../../ui/Container';
import { Heading } from '../../ui/Heading';
import { ItemList } from '../../ui/ItemList';
import { Link } from '../../ui/Link';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { DateInput } from '../../ui/DateInput';
import { useState } from 'react';
import { maskUtils } from '@/src/lib/utils';
import { TRANSACTION_TYPES } from '@/src/lib/constants/transaction';
import { TransactionModal } from '../TransactionModal';
import { DeleteTransactionModal } from '../TransactionModal/DeleteTransaction';
import { transactionService } from '@/src/services/transactions';
import { useRouter } from 'next/navigation';

interface TransactionsCardProps {
  transactions: Transaction[];
}

const initialFilterForm = {
  transactionType: TRANSACTION_TYPES[0].value,
  date: '',
  description: '',
};

export function TransactionsCard({ transactions }: TransactionsCardProps) {
  const router = useRouter();

  const [filterForm, setFilterForm] =
    useState<typeof initialFilterForm>(initialFilterForm);
  const [filteredTransactions, setFilteredTransactions] =
    useState<Transaction[]>(transactions);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const handleEditTranscation = (id: string) => {
    const transaction = transactions.find((t) => t.id === id) || null;
    setSelectedTransaction(transaction);
    setIsEditModalOpen(true);
  };

  const handleDeleteTranscation = (id: string) => {
    const transaction = transactions.find((t) => t.id === id) || null;
    setSelectedTransaction(transaction);
    setIsDeleteModalOpen(true);
  };

  const handleDescriptionFilter = (
    description: string,
    filterValue: string
  ): boolean => {
    if (filterValue === '') return true;
    return description.toLowerCase().includes(filterValue.toLowerCase());
  };

  const handleTranscationTypeFilter = (
    transactionType: TransactionType,
    filterValue: string
  ): boolean => {
    if (filterValue === '') return true;
    return transactionType === (filterValue as TransactionType);
  };

  const handleDateFilter = (date: Date, filterValue: string) => {
    if (filterValue === '') return true;
    return maskUtils.getDateMask(date) === filterValue;
  };

  const handleNewTransaction = async (data: Partial<Transaction>) => {
    try {
      await transactionService.createTransactions(data);

      setIsCreateModalOpen(false);
      router.refresh();
    } catch (error) {
      console.error('Erro ao criar nova transação:', error);
    }
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

  const handleFilterFormSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const filtered = transactions.filter((transaction) => {
      return (
        handleDescriptionFilter(
          transaction.description || '',
          filterForm.description
        ) &&
        handleTranscationTypeFilter(
          transaction.transactionType,
          filterForm.transactionType
        ) &&
        handleDateFilter(transaction.createdAt, filterForm.date)
      );
    });
    setFilteredTransactions(filtered);
  };

  const handleFilterFormReset = () => {
    setFilterForm(initialFilterForm);
    setFilteredTransactions(transactions);
  };

  return (
    <>
      <Link
        label="Voltar"
        iconLeft="ArrowLeftSLine"
        href="/"
        className="w-fit mt-8 mb-4"
      />
      <Container className="mb-6">
        <div className="mb-4 flex flex-col gap-3 md:mb-11 md:flex-row md:items-center md:justify-between">
          <Heading title="Transações Recentes" />
          <Button
            label="Nova Transação"
            size="sm"
            icon="AddLine"
            onClick={() => setIsCreateModalOpen(true)}
            className="w-full md:w-fit"
          />
        </div>
        <form onSubmit={handleFilterFormSubmit}>
          <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Input
              label="Busca"
              iconRight="SearchLine"
              placeholder="Buscar transações..."
              value={filterForm.description}
              onChange={(e) =>
                setFilterForm({ ...filterForm, description: e.target.value })
              }
            />
            <Select
              label="Tipo"
              options={TRANSACTION_TYPES}
              value={filterForm.transactionType}
              onChange={(e) =>
                setFilterForm({
                  ...filterForm,
                  transactionType: e.target.value,
                })
              }
            />
            <DateInput
              value={filterForm.date}
              onChange={(value) =>
                setFilterForm({ ...filterForm, date: value })
              }
            />
          </div>
          <div className="mb-10 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:gap-4">
            <Button
              label="Limpar"
              size="sm"
              kind="secondary"
              onClick={handleFilterFormReset}
              className="w-full sm:w-fit"
            />
            <Button
              label="Filtrar"
              size="sm"
              type="submit"
              className="w-full sm:w-fit"
            />
          </div>
        </form>
        {filteredTransactions.length > 0 ? (
          <div className="max-h-100 overflow-auto">
            <ul className="flex flex-col gap-5">
              {filteredTransactions.map((transaction) => (
                <ItemList
                  key={transaction.id}
                  id={transaction.id}
                  value={transaction.value}
                  date={transaction.createdAt}
                  kind={transaction.transactionType}
                  description={transaction.description}
                  onEditItem={handleEditTranscation}
                  onDeleteItem={handleDeleteTranscation}
                />
              ))}
            </ul>
          </div>
        ) : (
          <div className="text-center mb-8">
            <p>Nenhuma transação encontrada.</p>
          </div>
        )}
      </Container>
      <TransactionModal
        key="create-new"
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleNewTransaction}
      />
      <TransactionModal
        key={`edit-${selectedTransaction?.id}`}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        defaultValues={selectedTransaction as Transaction}
        onSave={handleSaveTransaction}
      />

      <DeleteTransactionModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        transaction={selectedTransaction}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
