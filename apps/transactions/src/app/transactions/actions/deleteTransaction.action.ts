'use server';

import { revalidatePath } from 'next/cache';
import { transactionService } from '@/src/services/transactions';

export async function deleteTransactionAction(id: string) {
  try {
    await transactionService.deleteTransactions(id);
    revalidatePath('/transactions');
    return { success: true as const };
  } catch (error) {
    console.error('Erro ao excluir transação:', error);
    return { success: false as const, error: 'Erro ao excluir transação' };
  }
}
