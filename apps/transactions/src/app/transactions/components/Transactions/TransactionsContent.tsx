'use client';

import { useMemo, useState } from 'react';
import { FilterFormValues, TransactionsProps } from '../../types';
import { applyTransactionFilters } from '../../utils/applyTransactionFilters';
import { TransactionFilters } from '../TransactionFilters';
import { TransactionList } from '../TransactionList';

export default function TransactionsContent({
  transactions,
}: TransactionsProps) {
  const [activeFilters, setActiveFilters] = useState<FilterFormValues | null>(
    null
  );

  const filteredTransactions = useMemo(() => {
    if (!activeFilters) return transactions;
    return applyTransactionFilters(transactions, activeFilters);
  }, [transactions, activeFilters]);

  return (
    <>
      <TransactionFilters
        onFilter={setActiveFilters}
        onReset={() => setActiveFilters(null)}
      />

      <div className="h-100 overflow-auto">
        <TransactionList transactions={filteredTransactions} />
      </div>
    </>
  );
}
