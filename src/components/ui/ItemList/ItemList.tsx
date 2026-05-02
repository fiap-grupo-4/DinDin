import { maskUtils } from "@/src/lib/utils";
import { Icon } from "../Icon";
import { TransactionType } from "@/src/types/transactions.types";

interface ItemListProps {
  id: string;
  value: number;
  date: Date;
  kind: TransactionType;
  description: string | undefined;
  onEditItem: (value: string) => void;
  onDeleteItem: (value: string) => void;
}

export function ItemList({
  id,
  value,
  date,
  kind,
  description,
  onDeleteItem,
  onEditItem,
}: ItemListProps) {
  const valueStyles: Record<TransactionType, { label: string; style: string }> =
    {
      income: { label: "+", style: "text-success-400" },
      expense: { label: "-", style: "text-danger-400" },
    };

  return (
    <li className="bg-gray-200 min-h-16 px-4 py-2 rounded-md flex items-stretch justify-between">
      <div className="flex flex-col flex-1 justify-center min-w-0">
        <p className="text-body-sm text-gray-600 truncate">{description}</p>
        <p className={`truncate ${valueStyles[kind].style}`}>
          {valueStyles[kind].label} {maskUtils.getCurrencyMask(value)}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-body-md text-gray-600">
          {maskUtils.getDateMask(date)}
        </p>
        <span className="w-px bg-gray-400 self-stretch"></span>
        <button type="button" onClick={() => onEditItem(id)}>
          <Icon
            name="PencilLine"
            size={20}
            className="text-gray-700 hover:text-gray-800"
          />
        </button>
        <button type="button" onClick={() => onDeleteItem(id)}>
          <Icon
            name="DeleteBin6Line"
            size={20}
            className="text-danger-400 hover:text-danger-600"
          />
        </button>
      </div>
    </li>
  );
}
