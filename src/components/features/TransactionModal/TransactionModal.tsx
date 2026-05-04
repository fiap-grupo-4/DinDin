import { TRANSACTION_TYPES } from '@/src/lib/constants/transaction';
import { maskUtils } from '@/src/lib/utils';
import { Transaction, TransactionType } from '@/src/types/transactions.types';
import { useState } from 'react';
import { Modal } from '../../ui/Modal';
import { Select } from '../../ui/Select';
import { Input } from '../../ui/Input';
import { DateInput } from '../../ui/DateInput';
import { Button } from '../../ui/Button';

interface TransactionModalProps {
  isOpen: boolean;
  defaultValues?: Transaction;
  onClose: () => void;
  onSave: (transaction: Partial<Transaction>) => Promise<void>;
}

const getInitialFormState = (values?: Transaction) => ({
  transactionType: {
    value: values?.transactionType ?? TRANSACTION_TYPES[0].value,
    isValid: !!values?.transactionType,
    isTouched: false,
    validation: (value: string) => value !== '',
  },
  date: {
    value: values?.createdAt ? maskUtils.getDateMask(values.createdAt) : '',
    isValid: !!values?.createdAt,
    isTouched: false,
    validation: (value: string) => value !== '',
  },
  description: {
    value: values?.description ?? '',
    isValid: true,
    isTouched: false,
  },
  value: {
    value: values?.value ?? '',
    isValid: !!values?.value,
    isTouched: false,
    validation: (value: string) => value !== '',
  },
});

export function TransactionModal({
  isOpen,
  onClose,
  onSave,
  defaultValues,
}: TransactionModalProps) {
  const [transactionForm, setTransactionForm] = useState(
    getInitialFormState(defaultValues)
  );

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

  const onChangeField = <T,>(
    field: keyof typeof transactionForm,
    newValue: T,
    validationCb?: (value: T) => boolean
  ) => {
    setTransactionForm((prev) => ({
      ...prev,
      [field]: {
        isValid: validationCb ? validationCb(newValue) : true,
        value: newValue,
        isTouched: true,
      },
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={defaultValues ? 'Editar Transação' : 'Nova Transação'}
      dotColor="brand"
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Select
            label="Tipo"
            options={TRANSACTION_TYPES}
            value={transactionForm.transactionType.value}
            state={
              transactionForm.transactionType.isTouched &&
              !transactionForm.transactionType.isValid
                ? 'error'
                : 'default'
            }
            required
            iconLeft="ListUnordered"
            onChange={(e) =>
              onChangeField<string>(
                'transactionType',
                e.target.value,
                transactionForm.transactionType.validation
              )
            }
          />
          <Input
            label="Valor"
            placeholder="R$ 0,00"
            value={transactionForm.value.value}
            state={
              transactionForm.value.isTouched && !transactionForm.value.isValid
                ? 'error'
                : 'default'
            }
            required
            iconLeft="MoneyDollarCircleLine"
            onChange={(e) =>
              onChangeField<string>(
                'value',
                e.target.value,
                transactionForm.value.validation
              )
            }
          />
          <DateInput
            value={transactionForm.date.value}
            state={
              transactionForm.date.isTouched && !transactionForm.date.isValid
                ? 'error'
                : 'default'
            }
            required
            onChange={(value) =>
              onChangeField('date', value, transactionForm.date.validation)
            }
          />
        </div>

        <Input
          label="Descrição"
          placeholder="Ex: Mercado, aluguel, salário..."
          iconLeft="DraftLine"
          value={transactionForm.description.value}
          onChange={(e) => onChangeField<string>('description', e.target.value)}
        />
        <div className="mt-2 flex w-full justify-end gap-4">
          <Button kind="secondary" label="Cancelar" onClick={handleClose} />
          <Button kind="primary" label="Salvar" type="submit" />
        </div>
      </form>
    </Modal>
  );
}
