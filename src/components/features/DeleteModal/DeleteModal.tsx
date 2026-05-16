'use client';

import { Modal } from '@/src/components/ui/Modal';
import { Button } from '@/src/components/ui/Button';

interface DeleteModalProps {
  isOpen: boolean;
  title?: string;
  description: string;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteModal({
  isOpen,
  title = 'Confirmar Exclusão',
  description,
  onClose,
  onConfirm,
}: DeleteModalProps) {
  return (
    <Modal
      title={title}
      isOpen={isOpen}
      onClose={onClose}
      kind="danger"
      maxWidth="sm"
    >
      <div className="flex flex-col gap-8 text-center">
        <p className="text-body-lg text-gray-800">{description}</p>
        <div className="flex justify-center gap-4">
          <Button kind="secondary" label="Cancelar" onClick={onClose} />
          <Button kind="danger" label="Excluir" onClick={onConfirm} />
        </div>
      </div>
    </Modal>
  );
}
