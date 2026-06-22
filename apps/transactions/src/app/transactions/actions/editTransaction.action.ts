'use server';

import { revalidatePath } from 'next/cache';
import { transactionService } from '@/src/services/transactions';
import { Transaction } from '@/types/transactions.types';

export async function editTransactionAction(data: Partial<Transaction>) {
  try {
    const transaction = await transactionService.updateTransactions(data);
    revalidatePath('/transactions');
    return { success: true as const, data: transaction };
  } catch (error) {
    console.error('Erro ao editar transação:', error);
    return { success: false as const, error: 'Erro ao editar transação' };
  }
}
