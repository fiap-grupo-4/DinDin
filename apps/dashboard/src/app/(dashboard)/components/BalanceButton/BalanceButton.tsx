'use client';

import { Icon } from '@dindin/ui';
import { useSensitiveAmount } from '@/src/hooks/useSensitiveAmount';
import { maskUtils } from '@/src/lib/utils';
import SensitiveAmount from '../SensitiveAmount/SensitiveAmount';

interface BalanceButtonProps {
  balance: number;
}

export function BalanceButton({ balance }: BalanceButtonProps) {
  const { showSensitiveAmount, toggleShowSensitiveAmount } =
    useSensitiveAmount();

  const isNegative = balance < 0;
  const valueClassName = `text-heading-xs lg:text-heading-lg lg:leading-heading ${
    isNegative ? 'text-danger-400' : ''
  }`;

  return (
    <>
      <p className="text-heading-xs lg:text-heading-md leading-heading mb-1">
        Saldo
      </p>
      <button
        type="button"
        className="flex items-center gap-2 text-brand-600 h-6 lg:h-9"
        onClick={toggleShowSensitiveAmount}
        aria-pressed={showSensitiveAmount}
        aria-label={
          showSensitiveAmount ? 'Ocultar saldo' : 'Mostrar saldo'
        }
      >
        <Icon
          name={showSensitiveAmount ? 'EyeLine' : 'EyeCloseLine'}
          className={showSensitiveAmount && isNegative ? 'text-danger-400' : ''}
        />
        <SensitiveAmount>
          <span className={valueClassName}>
            {maskUtils.getCurrencyMask(balance)}
          </span>
        </SensitiveAmount>
      </button>
    </>
  );
}
