'use server';

import { revalidatePath } from 'next/cache';
import { transactionService } from '@/src/services/transactions';
import { Transaction } from '@/types/transactions.types';

export async function createTransactionAction(data: Partial<Transaction>) {
  try {
    const transaction = await transactionService.createTransactions(data);
    revalidatePath('/transactions');
    return { success: true as const, data: transaction };
  } catch (error) {
    console.error('Erro ao criar nova transação:', error);
    return { success: false as const, error: 'Erro ao criar transação' };
  }
}
