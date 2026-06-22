export type TransactionActionKey =
  | 'create'
  | `edit-${string}`
  | `delete-${string}`;

import type { Transaction } from '@/types/transactions.types';

export type TransactionActionResult =
  | { success: true; data?: Transaction }
  | { success: false; error?: string };

export interface RunTransactionActionParams {
  actionKey: TransactionActionKey;
  action: () => Promise<TransactionActionResult>;
  successMessage: string;
  errorMessage: string;
  onSuccess?: () => void;
}

export const TRANSACTION_TOAST_MESSAGES = {
  create: {
    success: 'Transação criada com sucesso!',
    error: 'Não foi possível criar a transação.',
  },
  edit: {
    success: 'Transação atualizada com sucesso!',
    error: 'Não foi possível atualizar a transação.',
  },
  delete: {
    success: 'Transação excluída com sucesso!',
    error: 'Não foi possível excluir a transação.',
  },
} as const;

export function getEditActionKey(id: string): TransactionActionKey {
  return `edit-${id}`;
}

export function getDeleteActionKey(id: string): TransactionActionKey {
  return `delete-${id}`;
}
