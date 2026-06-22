'use client';

import { useForm } from '@/src/hooks/useForm';
import { TRANSACTION_TYPES } from '@/src/lib/constants/transaction';
import { Button, DateInput, Input, Select } from '@dindin/ui';
import { FilterFormValues } from '../../types';
import { getInitialFilterFormState } from '../../utils/getInitialFilterFormState';
import { hasFilterFormValues } from '../../utils/hasFilterFormValues';

interface TransactionFiltersProps {
  onFilter: (filters: FilterFormValues) => void;
  onReset: () => void;
  hasActiveFilters?: boolean;
}

export default function TransactionFilters({
  onFilter,
  onReset,
  hasActiveFilters = false,
}: TransactionFiltersProps) {
  const { form, onChangeField, resetForm } = useForm<FilterFormValues>(
    getInitialFilterFormState()
  );

  const currentFilters: FilterFormValues = {
    description: form.description.value,
    transactionType: form.transactionType.value,
    date: form.date.value,
  };

  const canFilter = hasFilterFormValues(currentFilters);
  const canClear = canFilter || hasActiveFilters;

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canFilter) return;

    onFilter(currentFilters);
  };

  const handleReset = () => {
    if (!canClear) return;

    resetForm();
    onReset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Input
          label="Busca"
          iconRight="SearchLine"
          placeholder="Buscar transações..."
          value={form.description.value}
          onChange={(e) => onChangeField('description', e.target.value)}
        />
        <Select
          label="Tipo"
          options={TRANSACTION_TYPES}
          value={form.transactionType.value}
          onChange={(e) => onChangeField('transactionType', e.target.value)}
        />
        <DateInput
          value={form.date.value}
          onChange={(value) => onChangeField('date', value)}
        />
      </div>
      <div className="mb-10 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end sm:gap-4">
        <Button
          label="Limpar Filtros"
          size="sm"
          kind="secondary"
          onClick={handleReset}
          disabled={!canClear}
          className="w-full sm:w-fit"
        />
        <Button
          label="Filtrar"
          size="sm"
          type="submit"
          disabled={!canFilter}
          className="w-full sm:w-fit"
        />
      </div>
    </form>
  );
}
