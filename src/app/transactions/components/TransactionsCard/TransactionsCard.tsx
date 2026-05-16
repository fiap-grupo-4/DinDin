'use client';

import { Transaction, TransactionType } from '@/src/types/transactions.types';
import { Container } from '@/src/components/ui/Container';
import { Heading } from '@/src/components/ui/Heading';
import { ItemList } from '@/src/components/features/ItemList';
import { Link } from '@/src/components/ui/Link';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Select } from '@/src/components/ui/Select';
import { DateInput } from '@/src/components/DateInput';
import { startTransition, useEffect, useState } from 'react';
import { maskUtils } from '@/src/lib/utils';
import { TRANSACTION_TYPES } from '@/src/lib/constants/transaction';
import { TransactionModal } from '@/src/components/features/TransactionModal';
import { DeleteModal } from '@/src/components/features/DeleteModal';
import { transactionService } from '@/src/services/transactions';

interface TransactionsCardProps {
  transactions: Transaction[];
}

const initialFilterForm = {
  transactionType: TRANSACTION_TYPES[0].value,
  date: '',
  description: '',
};

export function TransactionsCard({ transactions }: TransactionsCardProps) {
  const [filterForm, setFilterForm] =
    useState<typeof initialFilterForm>(initialFilterForm);
  const [listTransactions, setListTransactions] =
    useState<Transaction[]>(transactions);
  const [filteredTransactions, setFilteredTransactions] =
    useState<Transaction[]>(transactions);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const resetFiltersAndSetList = (list: Transaction[]) => {
    setFilterForm(initialFilterForm);
    setListTransactions(list);
    setFilteredTransactions(list);
  };

  const handleEditTranscation = (id: string) => {
    const transaction = listTransactions.find((t) => t.id === id) || null;
    setSelectedTransaction(transaction);
    setIsEditModalOpen(true);
  };

  const handleDeleteTranscation = (id: string) => {
    const transaction = listTransactions.find((t) => t.id === id) || null;
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

  const applyTransactionFilters = (
    list: Transaction[],
    form: typeof initialFilterForm
  ): Transaction[] =>
    list.filter(
      (transaction) =>
        handleDescriptionFilter(
          transaction.description || '',
          form.description
        ) &&
        handleTranscationTypeFilter(
          transaction.transactionType,
          form.transactionType
        ) &&
        handleDateFilter(transaction.createdAt, form.date)
    );

  const refetchTransactions = async () => {
    try {
      const fresh =
        await transactionService.getTransactions('?_sort=-createdAt');
      resetFiltersAndSetList(fresh);
    } catch (error) {
      console.error('Error on getting Transactions', error);
    }
  };

  useEffect(() => {
    startTransition(() => {
      resetFiltersAndSetList(transactions);
    });
  }, [transactions]);

  const handleNewTransaction = async (data: Partial<Transaction>) => {
    try {
      await transactionService.createTransactions(data);

      setIsCreateModalOpen(false);
      await refetchTransactions();
    } catch (error) {
      console.error('Erro ao criar nova transação:', error);
    }
  };

  const handleSaveTransaction = async (updatedData: Partial<Transaction>) => {
    try {
      await transactionService.updateTransactions(updatedData);

      setIsEditModalOpen(false);
      await refetchTransactions();
    } catch (error) {
      console.error('Erro ao editar transação:', error);
    }
  };

  const handleConfirmDelete = async (id: string) => {
    try {
      await transactionService.deleteTransactions(id);
      setIsDeleteModalOpen(false);
      await refetchTransactions();
    } catch (error) {
      console.error('Erro ao excluir transação:', error);
    }
  };

  const handleFilterFormSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFilteredTransactions(
      applyTransactionFilters(listTransactions, filterForm)
    );
  };

  const handleFilterFormReset = () => {
    setFilterForm(initialFilterForm);
    setFilteredTransactions(listTransactions);
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
          <Heading title="Transações" />
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

      {!!selectedTransaction && (
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          description={
            selectedTransaction?.description
              ? `Tem certeza que deseja excluir a transação de ${selectedTransaction?.description}?`
              : 'Tem certeza que deseja excluir esta transação?'
          }
          onConfirm={() => handleConfirmDelete(selectedTransaction.id)}
        />
      )}
    </>
  );
}
