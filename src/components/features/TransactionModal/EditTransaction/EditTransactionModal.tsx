'use client';

import { useState } from 'react';
import { Modal } from '../../../ui/Modal/Modal';
import { Button } from '../../../ui/Button/Button';
import { Input } from '../../../ui/Input/Input';
import { Select, SelectOption } from '../../../ui/Select/Select';
import { DateInput } from '../../../ui/DateInput/DateInput';
import { Transaction } from '@/src/types/transactions.types';

interface EditTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: Transaction | null;
  onSave: (id: string, updatedData: Partial<Transaction>) => Promise<void>;
}

const transactionTypes: SelectOption[] = [
  { label: 'Todas as transações', value: '' },
  { label: 'Entrada', value: 'income' },
  { label: 'Saída', value: 'expense' },
];

export function EditTransactionModal({
  isOpen,
  onClose,
  transaction,
  onSave,
}: EditTransactionModalProps) {
  const [description, setDescription] = useState(
    transaction?.description || ''
  );

  const [value, setValue] = useState<string | number>(transaction?.value || '');

  if (!transaction) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(transaction.id, {
      description: description,
      value: Number(value),
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
          <Select label="Tipo" options={transactionTypes} required />

          {/* Removido o iconLeft que causava erro no TypeScript */}
          <Input
            label="Valor"
            required
            placeholder="R$ 0,00"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          {/* <DateInput value='' onChange={} /> */}
        </div>

        <Input
          label="Descrição"
          placeholder="Ex: Mercado, aluguel, salário..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="mt-2 flex w-full justify-end gap-4">
          <Button kind="secondary" label="Cancelar" onClick={onClose} />
          <Button kind="primary" label="Salvar" type="submit" />
        </div>
      </form>
    </Modal>
  );
}
