'use client';

import { startTransition, useEffect, useState } from 'react';
import { Transaction, TransactionType } from '@/src/types/transactions.types';
import { Heading } from '@/src/components/ui/Heading';
import { TransactionCard } from '@/src/components/features/TransactionCard';
import { Button } from '@/src/components/ui/Button';
import { Input } from '@/src/components/ui/Input';
import { Select } from '@/src/components/ui/Select';
import { DateInput } from '@/src/components/ui/DateInput';
import { maskUtils } from '@/src/lib/utils';
import { TRANSACTION_TYPES } from '@/src/lib/constants/transaction';
import { TransactionModal } from '@/src/components/transactions/TransactionModal';
import { DeleteTransactionModal } from '@/src/components/transactions/DeleteTransactionModal';
import { transactionService } from '@/src/services/transactions';
import { FormState } from '@/src/types/forms.types';
import { TransactionList } from '@/src/components/transactions/TransactionList';

interface TransactionsProps {
  transactions: Transaction[];
}

type FilterFormValues = {
  transactionType: string;
  date: string;
  description: string;
};

const getInitialFormState = (): FormState<FilterFormValues> => ({
  transactionType: {
    value: TRANSACTION_TYPES[0].value,
    isValid: false,
    isTouched: false,
  },
  description: {
    value: '',
    isValid: false,
    isTouched: false,
  },
  date: {
    value: '',
    isValid: false,
    isTouched: false,
  },
});

const applyDescriptionFilter = (
  description: string,
  filterValue: string
): boolean => {
  if (filterValue === '') return true;
  return description.toLowerCase().includes(filterValue.toLowerCase());
};

const applyTranscationTypeFilter = (
  transactionType: TransactionType,
  filterValue: string
): boolean => {
  if (filterValue === '') return true;
  return transactionType === (filterValue as TransactionType);
};

const applyDateFilter = (date: Date, filterValue: string) => {
  if (filterValue === '') return true;
  return maskUtils.getDateMask(date) === filterValue;
};

const applyTransactionFilters = (
  list: Transaction[],
  form: FormState<FilterFormValues>
): Transaction[] =>
  list.filter(
    (transaction) =>
      applyDescriptionFilter(
        transaction.description || '',
        form.description.value
      ) &&
      applyTranscationTypeFilter(
        transaction.transactionType,
        form.transactionType.value
      ) &&
      applyDateFilter(transaction.createdAt, form.date.value)
  );

export function Transactions({ transactions }: TransactionsProps) {
  const [filterForm, setFilterForm] = useState<FormState<FilterFormValues>>(
    getInitialFormState()
  );

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
    setFilterForm(getInitialFormState());
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

  const getTransactions = async () => {
    try {
      const fresh =
        await transactionService.getTransactions('?_sort=-createdAt');
      resetFiltersAndSetList(fresh);
    } catch (error) {
      console.error('Error on getting Transactions', error);
    }
  };

  const handleCreateTransaction = async (data: Partial<Transaction>) => {
    try {
      await transactionService.createTransactions(data);

      setIsCreateModalOpen(false);
      await getTransactions();
    } catch (error) {
      console.error('Erro ao criar nova transação:', error);
    }
  };

  const handleUpdateTransaction = async (updatedData: Partial<Transaction>) => {
    try {
      await transactionService.updateTransactions(updatedData);

      setIsEditModalOpen(false);
      await getTransactions();
    } catch (error) {
      console.error('Erro ao editar transação:', error);
    }
  };

  const handleConfirmDelete = async (id: string) => {
    try {
      await transactionService.deleteTransactions(id);
      setIsDeleteModalOpen(false);
      await getTransactions();
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
    setFilterForm(getInitialFormState());
    setFilteredTransactions(listTransactions);
  };

  const onChangeField = (field: keyof typeof filterForm, newValue: string) => {
    setFilterForm((prev) => ({
      ...prev,
      [field]: {
        isValid: prev[field]?.validation
          ? prev[field].validation(newValue)
          : true,
        value: newValue,
        isTouched: true,
      },
    }));
  };

  useEffect(() => {
    startTransition(() => {
      resetFiltersAndSetList(transactions);
    });
  }, [transactions]);

  return (
    <>
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
            value={filterForm.description.value}
            onChange={(e) => onChangeField('description', e.target.value)}
          />
          <Select
            label="Tipo"
            options={TRANSACTION_TYPES}
            value={filterForm.transactionType.value}
            onChange={(e) => onChangeField('transactionType', e.target.value)}
          />
          <DateInput
            value={filterForm.date.value}
            onChange={(value) => onChangeField('date', value)}
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
      <div className="h-100 overflow-auto">
        <TransactionList
          transactions={filteredTransactions}
          onEdit={handleEditTranscation}
          onDelete={handleDeleteTranscation}
        />
      </div>
      <TransactionModal
        key="create-new"
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSave={handleCreateTransaction}
      />
      <TransactionModal
        key={`edit-${selectedTransaction?.id}`}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        defaultValues={selectedTransaction as Transaction}
        onSave={handleUpdateTransaction}
      />

      {!!selectedTransaction && (
        <DeleteTransactionModal
          isOpen={isDeleteModalOpen}
          description={selectedTransaction?.description}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => handleConfirmDelete(selectedTransaction.id)}
        />
      )}
    </>
  );
}
