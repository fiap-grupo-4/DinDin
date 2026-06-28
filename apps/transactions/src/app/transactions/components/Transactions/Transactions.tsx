'use client';

import { FilterFormValues } from '../../types';
import { useState } from 'react';
import { TransactionFilters } from '../TransactionFilters';
import { TransactionList } from '../TransactionList';
import {
  getTransactionsAction,
  TransactionsResults,
} from '../../actions/getTransactions.action';
import { TransactionPagination } from '../TransactionPagination';
import { mountQueryParams } from '../../utils/mountQueryParams';

interface TransactionsProps {
  data: TransactionsResults;
}

export default function Transactions({ data }: TransactionsProps) {
  const [activeFilters, setActiveFilters] = useState<FilterFormValues | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [transactions, setTransactions] = useState<TransactionsResults>(data);

  const getTransactions = async (queryParams?: string): Promise<void> => {
    setLoading(true);
    const result = await getTransactionsAction(queryParams);
    setLoading(false);
    if (!result.success) return;

    setTransactions(result.data);
    setCurrentPage(result.data.first + (result.data.prev ?? 0));
  };

  const onPageChange = async (page: number) => {
    setCurrentPage(page);
    await getTransactions(
      mountQueryParams({ page, pageSize, filters: activeFilters })
    );
  };

  const onPageSizeChange = async (size: number) => {
    setPageSize(size);
    await getTransactions(
      mountQueryParams({
        page: currentPage,
        pageSize: size,
        filters: activeFilters,
      })
    );
  };

  const onFilterTransactions = async (filters: FilterFormValues | null) => {
    setActiveFilters(filters);
    await getTransactions(
      mountQueryParams({ page: currentPage, pageSize, filters })
    );
  };

  return (
    <>
      <TransactionFilters
        onFilter={onFilterTransactions}
        onReset={() => onFilterTransactions(null)}
        hasActiveFilters={activeFilters !== null}
      />
      <TransactionList
        loading={loading}
        transactions={transactions.data}
        hasActiveFilters={activeFilters !== null}
      />
      {transactions.data.length > 0 && (
        <TransactionPagination
          pageSize={pageSize}
          currentPage={currentPage}
          totalPages={transactions.pages}
          totalItems={transactions.items}
          itemsPerPage={transactions.data.length}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          className="mt-8"
        />
      )}
    </>
  );
}
