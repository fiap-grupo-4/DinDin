'use server';

import { transactionService } from '@/src/services/transactions';
import { Transaction } from '@/src/types/transactions.types';

export type GetTransactionsResult =
  | { success: true; data: Transaction[] }
  | { success: false; error: string };

export async function getTransactionsAction(
  queryOptions = '?_sort=-createdAt'
): Promise<GetTransactionsResult> {
  try {
    const data = await transactionService.getTransactions(queryOptions);
    return { success: true, data };
  } catch (error) {
    console.error('Error on getting Transactions', error);
    return {
      success: false,
      error: 'Não foi possível carregar as transações.',
    };
  }
}
