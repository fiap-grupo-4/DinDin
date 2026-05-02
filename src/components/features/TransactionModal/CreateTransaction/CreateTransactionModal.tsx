'use client';

import { Modal } from '../../../ui/Modal/Modal';
import { Button } from '../../../ui/Button/Button';
import { Input } from '../../../ui/Input/Input';
import { Select } from '../../../ui/Select/Select';
import { DateInput } from '../../../ui/DateInput/DateInput';

interface CreateTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateTransactionModal({
  isOpen,
  onClose,
}: CreateTransactionModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Nova Transação"
      dotColor="brand"
      maxWidth="lg"
    >
      <form className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Select label="Tipo" required />
          <Input
            label="Valor"
            required
            placeholder="R$ 0,00"
            iconLeft="MoreLine"
          />
          <DateInput />
        </div>

        <Input
          label="Descrição"
          placeholder="Ex: Mercado, aluguel, salário..."
        />

        <div className="mt-4 flex w-full justify-end gap-4">
          <Button kind="secondary" label="Cancelar" onClick={onClose} />
          <Button kind="primary" label="Criar" type="submit" />
        </div>
      </form>
    </Modal>
  );
}
