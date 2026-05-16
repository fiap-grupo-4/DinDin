'use client';

import { TRANSACTION_TYPES } from '@/src/lib/constants/transaction';
import { maskUtils } from '@/src/lib/utils';
import { FormState } from '@/src/types/forms.types';
import { Transaction, TransactionType } from '@/src/types/transactions.types';
import { useState } from 'react';
import { Modal } from '@/src/components/ui/Modal';
import { Select } from '@/src/components/ui/Select';
import { Input } from '@/src/components/ui/Input';
import { DateInput } from '@/src/components/ui/DateInput';
import { Button } from '@/src/components/ui/Button';
import { InputState } from '../../ui/Input/Input';

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
    validation: (value) => value !== '',
  },
  date: {
    value: values?.createdAt ? maskUtils.getDateMask(values.createdAt) : '',
    isValid: !!values?.createdAt,
    isTouched: false,
    validation: (value) => value !== '',
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
    validation: (value) => value !== '',
  },
});

export function TransactionModal({
  isOpen,
  onClose,
  onSave,
  defaultValues,
}: TransactionModalProps) {
  const [transactionForm, setTransactionForm] = useState<
    FormState<TransactionFormValues>
  >(getInitialFormState(defaultValues));

  const handleClose = () => {
    setTransactionForm(getInitialFormState(defaultValues));
    onClose();
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(transactionForm).some((field) => !field.isValid)) {
      setTransactionForm((prev) => ({
        transactionType: { ...prev.transactionType, isTouched: true },
        date: { ...prev.date, isTouched: true },
        description: { ...prev.description, isTouched: true },
        value: { ...prev.value, isTouched: true },
      }));
      return;
    }

    const createdAt = maskUtils.parseDateString(transactionForm.date.value);
    if (!createdAt) {
      setTransactionForm((prev) => ({
        ...prev,
        date: { ...prev.date, isTouched: true },
      }));
      return;
    }

    onSave({
      id: defaultValues?.id,
      value: Number(transactionForm.value.value),
      description: transactionForm.description.value,
      transactionType: transactionForm.transactionType.value as TransactionType,
      createdAt,
    });
    setTransactionForm(getInitialFormState());
  };

  const onChangeField = (
    field: keyof typeof transactionForm,
    newValue: string
  ) => {
    setTransactionForm((prev) => ({
      ...prev,
      [field]: {
        isValid: prev[field]?.validation
          ? prev[field].validation(newValue)
          : true,
        value: newValue,
        isTouched: true,
      },
    }));
  };

  const isFieldValid = (field: keyof typeof transactionForm): InputState => {
    return transactionForm[field].isTouched && !transactionForm[field].isValid
      ? 'error'
      : 'default';
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
            value={transactionForm.transactionType.value}
            state={isFieldValid('transactionType')}
            required
            iconLeft="ListUnordered"
            errorMessage="Tipo inválido"
            onChange={(e) => onChangeField('transactionType', e.target.value)}
          />
          <Input
            label="Valor"
            placeholder="R$ 0,00"
            value={transactionForm.value.value}
            state={isFieldValid('value')}
            required
            iconLeft="MoneyDollarCircleLine"
            errorMessage="Valor inválido"
            onChange={(e) => onChangeField('value', e.target.value)}
          />
          <DateInput
            value={transactionForm.date.value}
            state={isFieldValid('date')}
            required
            errorMessage="Data inválida"
            onChange={(value) => onChangeField('date', value)}
          />
        </div>

        <Input
          label="Descrição"
          placeholder="Ex: Mercado, aluguel, salário..."
          iconLeft="DraftLine"
          value={transactionForm.description.value}
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
