'use server';

import { transactionService } from '@/src/services/transactions';
import { Transaction } from '@/types/transactions.types';

export type TransactionsResults = {
  first: number;
  prev: number | null;
  last: number;
  pages: number;
  items: number;
  data: Transaction[];
};

export type GetTransactionsResult =
  | { success: true; data: TransactionsResults }
  | { success: false; error: string };

export async function getTransactionsAction(
  queryOptions?: string
): Promise<GetTransactionsResult> {
  try {
    const data = await transactionService.getTransactions(
      `?_sort=-createdAt${queryOptions || ''}`
    );
    return { success: true, data };
  } catch (error) {
    console.error('Error on getting Transactions', error);
    return {
      success: false,
      error: 'Não foi possível carregar as transações.',
    };
  }
}
