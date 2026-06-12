import { SelectOption } from '@/src/components/ui/Select/Select';

export const TRANSACTION_TYPES: SelectOption[] = [
  { label: 'Selecione um tipo', value: '' },
  { label: 'Entrada', value: 'income' },
  { label: 'Saída', value: 'expense' },
];
