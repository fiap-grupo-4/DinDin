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
