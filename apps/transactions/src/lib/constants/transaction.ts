import { SelectOption } from '@dindin/ui';

export const TRANSACTION_TYPES: SelectOption[] = [
  { label: 'Selecione um tipo', value: '' },
  { label: 'Entrada', value: 'income' },
  { label: 'Saída', value: 'expense' },
];

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
};
