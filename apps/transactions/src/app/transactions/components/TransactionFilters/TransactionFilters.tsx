'use client';

import { Button, Input, Select, DateInput } from '@dindin/ui';
import { TRANSACTION_TYPES } from '@/src/lib/constants/transaction';
import { useForm } from '@/src/hooks/useForm';
import { FilterFormValues } from '../../types';
import { getInitialFilterFormState } from '../../utils/getInitialFilterFormState';

interface TransactionFiltersProps {
  onFilter: (filters: FilterFormValues) => void;
  onReset: () => void;
}

export default function TransactionFilters({
  onFilter,
  onReset,
}: TransactionFiltersProps) {
  const { form, onChangeField, resetForm } = useForm<FilterFormValues>(
    getInitialFilterFormState()
  );

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    onFilter({
      description: form.description.value,
      transactionType: form.transactionType.value,
      date: form.date.value,
    });
  };

  const handleReset = () => {
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
          label="Limpar"
          size="sm"
          kind="secondary"
          onClick={handleReset}
          className="w-full sm:w-fit"
        />
        <Button
          label="Filtrar"
          size="sm"
          type="submit"
          className="w-full sm:w-fit"
        />
      </div>
    </form>
  );
}
