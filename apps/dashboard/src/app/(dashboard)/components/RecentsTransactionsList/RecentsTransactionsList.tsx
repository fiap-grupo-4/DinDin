'use client';

import { Transaction, TransactionType } from '@/src/types/transactions.types';
import { maskUtils } from '@/src/lib/utils';

interface RecentsTransactionsListProps {
  transactions: Transaction[];
}

const valueStyles: Record<TransactionType, { label: string; style: string }> = {
  income: { label: '+', style: 'text-success-400' },
  expense: { label: '-', style: 'text-danger-400' },
};

export function RecentsTransactionsList({
  transactions,
}: RecentsTransactionsListProps) {
  const recentsTransactions =
    transactions.length > 5 ? transactions.slice(0, 5) : transactions;

  return (
    <>
      {recentsTransactions.length > 0 ? (
        <ul className="flex flex-col gap-5">
          {recentsTransactions.map(
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
