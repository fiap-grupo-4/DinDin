import { SelectOption } from '@/src/components/ui/Select/Select';

export const TRANSACTION_TYPES: SelectOption[] = [
  { label: 'Selecione um tipo de transação', value: '' },
  { label: 'Entrada', value: 'income' },
  { label: 'Saída', value: 'expense' },
];
