'use server';

import { transactionService } from '@/src/services/transactions';
import { Transaction } from '@/src/types/transactions.types';

export async function getTransactionsAction(
  queryOptions = '?_sort=-createdAt'
): Promise<Transaction[]> {
  try {
    return await transactionService.getTransactions(queryOptions);
  } catch (error) {
    console.error('Error on getting Transactions', error);
    return [];
  }
}
