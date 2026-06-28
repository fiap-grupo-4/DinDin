'use client';

import { Transaction, TransactionType } from '@/types/transactions.types';
import { maskUtils } from '@/src/lib/utils';
import { EditTransaction } from '../EditTransaction';
import { DeleteTransaction } from '../DeleteTransaction';
import { TransactionLoading } from '../TransactionLoading';

interface TransactionListProps {
  loading?: boolean;
  transactions: Transaction[];
  hasActiveFilters?: boolean;
}

const valueStyles: Record<TransactionType, { label: string; style: string }> = {
  income: { label: '+', style: 'text-success-400' },
  expense: { label: '-', style: 'text-danger-400' },
};

const ListContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="h-[420px] overflow-auto">{children}</div>;
};

export default function TransactionList({
  loading,
  transactions,
  hasActiveFilters = false,
}: TransactionListProps) {
  if (loading)
    return (
      <ListContainer>
        <TransactionLoading />
      </ListContainer>
    );

  if (transactions.length === 0)
    return (
      <ListContainer>
        <p className="text-center text-body-lg md:text-heading-lg leading-body text-gray-700">
          {hasActiveFilters
            ? 'Nenhum resultado para os filtros aplicados.'
            : 'Nenhuma transação cadastrada.'}
        </p>
      </ListContainer>
    );

  return (
    <ListContainer>
      <ul className="flex flex-col gap-5">
        {transactions.map((transaction) => {
          const { id, description, value, transactionType, createdAt } =
            transaction;

          return (
            <li
              key={id}
              className="bg-gray-200 min-h-16 px-4 py-2 rounded-md flex items-stretch justify-between gap-3"
            >
              <div className="flex flex-col flex-1 justify-center min-w-0">
                <p className="text-body-sm text-gray-600 truncate">
                  {description}
                </p>
                <p className={`truncate ${valueStyles[transactionType].style}`}>
                  {valueStyles[transactionType].label}{' '}
                  {maskUtils.getCurrencyMask(value)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <p className="text-body-md text-gray-600">
                  {maskUtils.getDateMask(createdAt)}
                </p>
                <span className="w-px bg-gray-400 self-stretch" />
                <EditTransaction transaction={transaction} />
                <DeleteTransaction transaction={transaction} />
              </div>
            </li>
          );
        })}
      </ul>
    </ListContainer>
  );
}
