import { maskUtils } from "@/src/lib/utils";
import { TransactionType } from "@/src/types/transactions.types";

interface SummaryCardDetailsProps {
  label: string;
  value: number;
  kind: TransactionType;
}

export function SummaryCardDetails({
  label,
  value,
  kind,
}: SummaryCardDetailsProps) {
  const detailStyles: Record<
    TransactionType,
    { label: string; style: string }
  > = {
    income: { label: "+", style: "text-success-400" },
    expense: { label: "-", style: "text-danger-400" },
  };

  return (
    <div className="bg-gray-200 px-5 py-3 rounded-md w-full md:w-auto">
      <p className="text-heading-xs md:text-heading-sm">{label}</p>
      <p
        className={`text-heading-sm md:text-heading-lg ${detailStyles[kind].style}`}
      >
        {`${detailStyles[kind].label} ${maskUtils.getCurrencyMask(value)}`}
      </p>
    </div>
  );
}
