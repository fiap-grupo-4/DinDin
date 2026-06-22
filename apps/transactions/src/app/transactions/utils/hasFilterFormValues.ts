import { FilterFormValues } from '../types';

export function hasFilterFormValues(filters: FilterFormValues): boolean {
  return (
    filters.description.trim() !== '' ||
    filters.transactionType.trim() !== '' ||
    filters.date.trim() !== ''
  );
}
