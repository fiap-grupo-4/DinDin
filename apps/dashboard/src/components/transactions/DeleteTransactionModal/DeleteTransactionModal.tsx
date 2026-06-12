'use client';

import { Modal, Button } from '@dindin/ui';

interface DeleteTransactionModalProps {
  isOpen: boolean;
  description?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteTransactionModal({
  isOpen,
  description,
  onClose,
  onConfirm,
}: DeleteTransactionModalProps) {
  return (
    <Modal
      title="Confirmar Exclusão"
      isOpen={isOpen}
      onClose={onClose}
      kind="danger"
      maxWidth="sm"
    >
      <div className="flex flex-col gap-8 text-center">
        <p className="text-body-lg text-gray-800">
          {description
            ? `Tem certeza que deseja excluir a transação de ${description}?`
            : 'Tem certeza que deseja excluir esta transação?'}
        </p>
        <div className="flex justify-center gap-4">
          <Button kind="secondary" label="Cancelar" onClick={onClose} />
          <Button kind="danger" label="Excluir" onClick={onConfirm} />
        </div>
      </div>
    </Modal>
  );
}
