'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Transaction, TransactionType } from '@/src/types/transactions.types';
import { transactionService } from '@/src/services/transactions';
import { Container } from '../../ui/Container';
import { Heading } from '../../ui/Heading';
import { ItemList } from '../../ui/ItemList';
import { Link } from '../../ui/Link';
import { Button } from '../../ui/Button';
import { Input } from '../../ui/Input';
import { Select } from '../../ui/Select';
import { DateInput } from '../../ui/DateInput';
import { SelectOption } from '../../ui/Select/Select';
import { maskUtils } from '@/src/lib/utils';

import { CreateTransactionModal } from '../TransactionModal/CreateTransaction';
import { EditTransactionModal } from '../TransactionModal/EditTransaction';
import { DeleteTransactionModal } from '../TransactionModal/DeleteTransaction';

interface TransactionsCardProps {
  transactions: Transaction[];
}

const transactionTypes: SelectOption[] = [
  { label: 'Todas as transações', value: '' },
  { label: 'Entrada', value: 'income' },
  { label: 'Saída', value: 'expense' },
];

const initialFilterForm = {
  transactionType: transactionTypes[0].value,
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

  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);

  const handleNewTransaction = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditTransactionClick = (id: string) => {
    const transaction = transactions.find((t) => t.id === id) || null;
    setSelectedTransaction(transaction);
    setIsEditModalOpen(true);
  };

  const handleDeleteTransactionClick = (id: string) => {
    const transaction = transactions.find((t) => t.id === id) || null;
    setSelectedTransaction(transaction);
    setIsDeleteModalOpen(true);
  };

  const handleCreateTransaction = async (
    newTransaction: Omit<Transaction, 'id'>
  ) => {
    try {
      await transactionService.createTransaction(newTransaction);
      router.refresh();
    } catch (error) {
      console.error('Erro ao criar transação', error);
    }
  };

  const handleSaveEditTransaction = async (
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

  const handleFilterFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
            onClick={handleNewTransaction}
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
              options={transactionTypes}
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
                  onEditItem={() => handleEditTransactionClick(transaction.id)}
                  onDeleteItem={() =>
                    handleDeleteTransactionClick(transaction.id)
                  }
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

      <CreateTransactionModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateTransaction}
      />

      <EditTransactionModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        transaction={selectedTransaction}
        onSave={handleSaveEditTransaction}
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
