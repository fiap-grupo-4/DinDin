'use client';

import { useSensitiveAmount } from '@/src/hooks/useSensitiveAmount';

interface SensitiveAmountProps {
  children: React.ReactNode;
  className?: string;
}

export default function SensitiveAmount({
  children,
  className = '',
}: SensitiveAmountProps) {
  const { showSensitiveAmount } = useSensitiveAmount();

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span
        aria-hidden={!showSensitiveAmount}
        className={`inline-block transition-[filter,opacity,transform] duration-300 ease-out motion-reduce:transition-none ${
          showSensitiveAmount
            ? 'blur-none opacity-100 scale-100'
            : 'blur-[6px] opacity-50 select-none scale-[0.98]'
        }`}
      >
        {children}
      </span>
      {!showSensitiveAmount && (
        <span className="sr-only">Valor oculto</span>
      )}
    </span>
  );
}
