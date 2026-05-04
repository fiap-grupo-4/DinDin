import { Transaction } from '@/src/types/transactions.types';
import { httpClient } from '../http';

const getTransactions = async (queryOptions = ''): Promise<Transaction[]> => {
  const res = await httpClient.get<Transaction[]>(
    `/transactions${queryOptions}`
  );
  return res;
};

const deleteTransactions = async (id: string): Promise<void> => {
  await httpClient.delete<void>(`/transactions/${id}`);
};

const createTransactions = async (
  body: Partial<Transaction>
): Promise<Transaction> => {
  return httpClient.post<Transaction>('/transactions', body);
};

const updateTransactions = async (
  body: Partial<Transaction>
): Promise<Transaction> => {
  return httpClient.patch<Transaction>(`/transactions/${body.id}`, body);
};

export const transactionService = {
  getTransactions,
  deleteTransactions,
  updateTransactions,
  createTransactions,
};
