'use client';

import { useState } from 'react';
import { Modal } from '../../../ui/Modal/Modal';
import { Button } from '../../../ui/Button/Button';
import { Input } from '../../../ui/Input/Input';
import { Select, SelectOption } from '../../../ui/Select/Select';
import { DateInput } from '../../../ui/DateInput/DateInput';
import { Transaction, TransactionType } from '@/src/types/transactions.types';

interface EditTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: Transaction | null;
  onSave: (id: string, updatedData: Partial<Transaction>) => Promise<void>;
}

const transactionTypes: SelectOption[] = [
  { label: 'Selecione um tipo...', value: '' },
  { label: 'Entrada', value: 'income' },
  { label: 'Saída', value: 'expense' },
];

export function EditTransactionModal({
  isOpen,
  onClose,
  transaction,
  onSave,
}: EditTransactionModalProps) {
  const [loadedTransactionId, setLoadedTransactionId] = useState<
    string | undefined
  >(undefined);
  const [lastOpenedState, setLastOpenedState] = useState<boolean>(false);

  const [description, setDescription] = useState('');
  const [value, setValue] = useState<string | number>('');
  const [transactionType, setTransactionType] = useState<string>('');
  const [date, setDate] = useState<string>('');

  if (transaction?.id !== loadedTransactionId || isOpen !== lastOpenedState) {
    setLoadedTransactionId(transaction?.id);
    setLastOpenedState(isOpen);

    if (transaction && isOpen) {
      setDescription(transaction.description || '');
      setTransactionType(transaction.transactionType || '');

      if (transaction.value !== undefined) {
        setValue(transaction.value.toFixed(2).replace('.', ','));
      } else {
        setValue('');
      }

      if (transaction.createdAt) {
        const dateObj = new Date(transaction.createdAt);
        setDate(dateObj.toLocaleDateString('pt-BR'));
      } else {
        setDate('');
      }
    }
  }

  if (!transaction) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!date) return;

    const [day, month, year] = date.split('/');
    const formattedDate = new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    );

    const formattedValue =
      typeof value === 'string'
        ? Number(value.replace(',', '.'))
        : Number(value);

    await onSave(transaction.id, {
      description: description,
      value: formattedValue,
      transactionType: transactionType as TransactionType,
      createdAt: formattedDate,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Editar Transação"
      dotColor="brand"
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Select
            label="Tipo"
            options={transactionTypes}
            value={transactionType}
            onChange={(e) => setTransactionType(e.target.value)}
            iconLeft="ListUnordered"
            required
          />

          <Input
            label="Valor"
            required
            placeholder="R$ 0,00"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            iconLeft="MoneyDollarCircleLine"
          />

          <DateInput value={date} onChange={(val) => setDate(val)} />
        </div>

        <Input
          label="Descrição"
          placeholder="Ex: Mercado, aluguel, salário..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          iconLeft="DraftLine"
          required
        />

        <div className="mt-2 flex w-full justify-end gap-4">
          <Button kind="danger" label="Cancelar" onClick={onClose} />
          <Button kind="primary" label="Salvar" type="submit" />
        </div>
      </form>
    </Modal>
  );
}
