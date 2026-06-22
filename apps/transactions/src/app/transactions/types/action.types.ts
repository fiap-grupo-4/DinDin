export type TransactionActionKey =
  | 'create'
  | `edit-${string}`
  | `delete-${string}`;

export type TransactionActionResult =
  | { success: true }
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
