'use client';

import { maskUtils } from '@/src/lib/utils';
import { TransactionType } from '@/src/types/transactions.types';
import SensitiveAmount from '../SensitiveAmount/SensitiveAmount';

interface SummaryCardDetailsProps {
  label: string;
  value: number;
  kind: TransactionType;
}

const detailStyles: Record<TransactionType, { label: string; style: string }> =
  {
    income: { label: '+', style: 'text-success-400' },
    expense: { label: '-', style: 'text-danger-400' },
  };

export function SummaryCardDetails({
  label,
  value,
  kind,
}: SummaryCardDetailsProps) {
  const { label: sign, style } = detailStyles[kind];

  return (
    <div className="bg-gray-200 px-5 py-3 rounded-md w-full">
      <p className="text-heading-xs md:text-heading-sm">{label}</p>
      <p
        className={`text-heading-sm md:text-heading-lg min-h-[28px] flex items-center ${style}`}
      >
        <SensitiveAmount className={style}>
          {`${sign} ${maskUtils.getCurrencyMask(value)}`}
        </SensitiveAmount>
      </p>
    </div>
  );
}
