import { Transaction } from '@/types/transactions.types';

export type FilterFormValues = {
  transactionType: string;
  date: string;
  description: string;
};

export interface TransactionsProps {
  transactions: Transaction[];
}
