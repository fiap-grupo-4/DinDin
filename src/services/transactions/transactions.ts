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

const updateTransactions = async (
  id: string,
  body: Partial<Transaction>
): Promise<Transaction> => {
  return httpClient.patch<Transaction>(`/transactions/${id}`, body);
};

const createTransaction = async (
  body: Omit<Transaction, 'id'>
): Promise<Transaction> => {
  return httpClient.post<Transaction>('/transactions', body);
};

export const transactionService = {
  getTransactions,
  deleteTransactions,
  updateTransactions,
  createTransaction,
};