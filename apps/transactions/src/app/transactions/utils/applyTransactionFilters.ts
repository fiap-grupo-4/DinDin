import { maskUtils } from '@/src/lib/utils';
import { Transaction, TransactionType } from '@/types/transactions.types';
import { FilterFormValues } from '../types';

const applyDescriptionFilter = (
  description: string,
  filterValue: string
): boolean => {
  if (filterValue === '') return true;
  return description.toLowerCase().includes(filterValue.toLowerCase());
};

const applyTransactionTypeFilter = (
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

export function applyTransactionFilters(
  list: Transaction[],
  filters: FilterFormValues
): Transaction[] {
  return list.filter(
    (transaction) =>
      applyDescriptionFilter(
        transaction.description || '',
        filters.description
      ) &&
      applyTransactionTypeFilter(
        transaction.transactionType,
        filters.transactionType
      ) &&
      applyDateFilter(new Date(transaction.createdAt), filters.date)
  );
}
