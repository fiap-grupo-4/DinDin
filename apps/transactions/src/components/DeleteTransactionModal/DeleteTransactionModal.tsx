'use client';

import { Modal, Button } from '@dindin/ui';

interface DeleteTransactionModalProps {
  isOpen: boolean;
  description?: string;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isSubmitting?: boolean;
  isActionsDisabled?: boolean;
}

export function DeleteTransactionModal({
  isOpen,
  description,
  onClose,
  onConfirm,
  isSubmitting = false,
  isActionsDisabled = false,
}: DeleteTransactionModalProps) {
  const handleClose = () => {
    if (isActionsDisabled) return;
    onClose();
  };

  const handleConfirm = async () => {
    if (isActionsDisabled) return;
    await onConfirm();
  };

  return (
    <Modal
      title="Confirmar Exclusão"
      isOpen={isOpen}
      onClose={handleClose}
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
          <Button
            kind="secondary"
            label="Cancelar"
            onClick={handleClose}
            disabled={isActionsDisabled}
          />
          <Button
            kind="danger"
            label={isSubmitting ? 'Excluindo...' : 'Excluir'}
            onClick={handleConfirm}
            disabled={isActionsDisabled}
          />
        </div>
      </div>
    </Modal>
  );
}
