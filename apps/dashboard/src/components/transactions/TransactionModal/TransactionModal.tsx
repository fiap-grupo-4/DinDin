'use client';

import { TRANSACTION_TYPES } from '@/src/lib/constants/transaction';
import { maskUtils } from '@/src/lib/utils';
import { FormState } from '@/src/types/forms.types';
import { Transaction, TransactionType } from '@/src/types/transactions.types';
import { Modal } from '@/src/components/ui/Modal';
import { Select } from '@/src/components/ui/Select';
import { Input } from '@/src/components/ui/Input';
import { DateInput } from '@/src/components/ui/DateInput';
import { Button } from '@/src/components/ui/Button';
import { useForm } from '@/src/hooks/useForm';

interface TransactionModalProps {
  isOpen: boolean;
  defaultValues?: Transaction;
  onClose: () => void;
  onSave: (transaction: Partial<Transaction>) => Promise<void>;
}

type TransactionFormValues = {
  transactionType: string;
  date: string;
  description: string;
  value: string;
};

const getInitialFormState = (
  values?: Transaction
): FormState<TransactionFormValues> => ({
  transactionType: {
    value: values?.transactionType ?? TRANSACTION_TYPES[0].value,
    isValid: !!values?.transactionType,
    isTouched: false,
    validation: (value) => {
      if (value === '')
        return { value: false, message: 'Selecione um tipo de transação.' };
      return true;
    },
  },
  date: {
    value: values?.createdAt ? maskUtils.getDateMask(values.createdAt) : '',
    isValid: !!values?.createdAt,
    isTouched: false,
    validation: (value) => {
      if (value === '')
        return { value: false, message: 'Informe a data da transação.' };
      return true;
    },
  },
  description: {
    value: values?.description ?? '',
    isValid: true,
    isTouched: false,
  },
  value: {
    value: values?.value != null ? maskUtils.getCurrencyMask(values.value) : '',
    isValid: values?.value != null,
    isTouched: false,
    validation: (value) => {
      if (value === '')
        return { value: false, message: 'Informe um valor da transação.' };
      return true;
    },
  },
});

export function TransactionModal({
  isOpen,
  onClose,
  onSave,
  defaultValues,
}: TransactionModalProps) {
  const { form, isFieldValid, onChangeField, validateFields, resetForm } =
    useForm<TransactionFormValues>(getInitialFormState(defaultValues));

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (Object.values(form).some((field) => !field.isValid)) {
      validateFields(['date', 'description', 'transactionType', 'value']);
      return;
    }

    const createdAt = maskUtils.parseDateString(form.date.value);
    if (!createdAt) {
      validateFields('date');
      return;
    }

    onSave({
      id: defaultValues?.id,
      value: Number(form.value.value),
      description: form.description.value,
      transactionType: form.transactionType.value as TransactionType,
      createdAt,
    });
    resetForm();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={defaultValues ? 'Editar Transação' : 'Nova Transação'}
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Select
            label="Tipo"
            options={TRANSACTION_TYPES}
            value={form.transactionType.value}
            state={isFieldValid('transactionType')}
            required
            iconLeft="ListUnordered"
            errorMessage={form.transactionType.errorMessage}
            onChange={(e) => onChangeField('transactionType', e.target.value)}
          />
          <Input
            label="Valor"
            placeholder="R$ 0,00"
            value={form.value.value}
            state={isFieldValid('value')}
            required
            iconLeft="MoneyDollarCircleLine"
            errorMessage={form.value.errorMessage}
            onChange={(e) => onChangeField('value', e.target.value)}
          />
          <DateInput
            value={form.date.value}
            state={isFieldValid('date')}
            required
            errorMessage={form.date.errorMessage}
            onChange={(value) => onChangeField('date', value)}
          />
        </div>

        <Input
          label="Descrição"
          placeholder="Ex: Mercado, aluguel, salário..."
          iconLeft="DraftLine"
          value={form.description.value}
          onChange={(e) => onChangeField('description', e.target.value)}
        />
        <div className="mt-2 flex w-full justify-end gap-4">
          <Button kind="secondary" label="Cancelar" onClick={handleClose} />
          <Button kind="primary" label="Salvar" type="submit" />
        </div>
      </form>
    </Modal>
  );
}
