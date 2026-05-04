'use client';

import { useState } from 'react';
import { Modal } from '../../../ui/Modal/Modal';
import { Button } from '../../../ui/Button/Button';
import { Input } from '../../../ui/Input/Input';
import { Select, SelectOption } from '../../../ui/Select/Select';
import { DateInput } from '../../../ui/DateInput/DateInput';
import { Transaction, TransactionType } from '@/src/types/transactions.types';

interface CreateTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (newTransaction: Omit<Transaction, 'id'>) => Promise<void>;
}

const transactionTypes: SelectOption[] = [
  { label: 'Selecione um tipo...', value: '' },
  { label: 'Entrada', value: 'income' },
  { label: 'Saída', value: 'expense' },
];

export function CreateTransactionModal({
  isOpen,
  onClose,
  onCreate,
}: CreateTransactionModalProps) {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState<string | number>('');
  const [transactionType, setTransactionType] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const handleCloseAndReset = () => {
    setDescription('');
    setValue('');
    setTransactionType('');
    setDate('');
    onClose();
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
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

    await onCreate({
      description: description,
      value: formattedValue,
      transactionType: transactionType as TransactionType,
      createdAt: formattedDate,
    });

    handleCloseAndReset();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseAndReset}
      title="Nova Transação"
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
          <Button
            kind="danger"
            label="Cancelar"
            onClick={handleCloseAndReset}
          />
          <Button kind="primary" label="Criar" type="submit" />
        </div>
      </form>
    </Modal>
  );
}
