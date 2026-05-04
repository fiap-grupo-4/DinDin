'use client';

import { ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import { Heading } from '../Heading/Heading';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  dotColor?: 'brand' | 'danger';
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({
  isOpen,
  onClose,
  title,
  dotColor,
  children,
  maxWidth = 'md',
}: ModalProps) {
  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-3xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div
        className={`w-full rounded-lg bg-white p-6 shadow-xl ${maxWidthClasses[maxWidth]}`}
      >
        <div className="mb-6 flex items-center justify-between">
          <Heading title={title} dotColor={dotColor} />

          <button
            onClick={onClose}
            className="text-gray-400 transition-colors hover:text-gray-600"
          >
            <Icon name="CloseLine" size={24} />
          </button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
}
