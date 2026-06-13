import { Transaction, TransactionType } from '@/types/transactions.types';
import { maskUtils } from '@/src/lib/utils';
import { Icon } from '@dindin/ui';

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (value: string) => void;
  onDelete: (value: string) => void;
}

const valueStyles: Record<TransactionType, { label: string; style: string }> = {
  income: { label: '+', style: 'text-success-400' },
  expense: { label: '-', style: 'text-danger-400' },
};

export function TransactionList({
  transactions,
  onEdit,
  onDelete,
}: TransactionListProps) {
  return (
    <>
      {transactions.length > 0 ? (
        <ul className="flex flex-col gap-5">
          {transactions.map(
            ({ id, description, value, transactionType, createdAt }) => (
              <li
                key={id}
                className="bg-gray-200 min-h-16 px-4 py-2 rounded-md flex items-stretch justify-between gap-3"
              >
                <div className="flex flex-col flex-1 justify-center min-w-0">
                  <p className="text-body-sm text-gray-600 truncate">
                    {description}
                  </p>
                  <p
                    className={`truncate ${valueStyles[transactionType].style}`}
                  >
                    {valueStyles[transactionType].label}{' '}
                    {maskUtils.getCurrencyMask(value)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-body-md text-gray-600">
                    {maskUtils.getDateMask(createdAt)}
                  </p>
                  <span className="w-px bg-gray-400 self-stretch"></span>
                  <button type="button" onClick={() => onEdit(id)}>
                    <Icon
                      name="PencilLine"
                      size={20}
                      className="text-gray-700 hover:text-gray-800"
                    />
                  </button>
                  <button type="button" onClick={() => onDelete(id)}>
                    <Icon
                      name="DeleteBin6Line"
                      size={20}
                      className="text-danger-400 hover:text-danger-600"
                    />
                  </button>
                </div>
              </li>
            )
          )}
        </ul>
      ) : (
        <p className="text-center mb-8">Nenhuma transação encontrada.</p>
      )}
    </>
  );
}
