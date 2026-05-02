'use client';

import { Modal } from '../../../ui/Modal/Modal';
import { Button } from '../../../ui/Button/Button';
import { Transaction } from '@/src/types/transactions.types';

interface DeleteTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: Transaction | null;
  onConfirm: (id: string) => Promise<void>;
}

export function DeleteTransactionModal({
  isOpen,
  onClose,
  transaction,
  onConfirm,
}: DeleteTransactionModalProps) {
  if (!transaction) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirmar Exclusão"
      dotColor="danger"
      maxWidth="sm"
    >
      <div className="flex flex-col gap-8 text-center">
        <p className="text-body-lg text-gray-800">
          Tem certeza que deseja excluir a transação de{' '}
          <strong>{transaction.description}</strong>?
        </p>
        <div className="flex justify-center gap-4">
          <Button kind="secondary" label="Cancelar" onClick={onClose} />

          <Button
            kind="danger"
            label="Excluir"
            onClick={() => onConfirm(transaction.id)}
          />
        </div>
      </div>
    </Modal>
  );
}
