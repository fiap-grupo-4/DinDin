import { maskUtils } from '@/src/lib/utils';

interface ProgressBarProps {
  title: string;
  currentValue: number;
  totalValue: number;
}

export function ProgressBar({
  title,
  currentValue,
  totalValue,
}: ProgressBarProps) {
  const safeCurrentValue = Math.max(0, Math.min(currentValue, totalValue));
  const percentage = totalValue > 0 ? (safeCurrentValue / totalValue) * 100 : 0;

  return (
    <div>
      <p className="mb-1">{title}</p>
      <div className="rounded bg-gray-500 w-full h-2">
        <div
          className="rounded bg-brand-500 h-2"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-body-sm text-gray-700">
          {maskUtils.getCurrencyMask(safeCurrentValue)}
        </span>
        <span className="text-body-sm text-gray-700">
          {maskUtils.getCurrencyMask(totalValue)}
        </span>
      </div>
    </div>
  );
}
