'use client';

import { Button, Select, SelectOption } from '@dindin/ui';
import { renderPaginationNumbers } from '../../utils/renderPaginationNumbers';

interface TransactionPaginationProps {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  className?: string;
}

const pageSizeOptions: SelectOption[] = [
  { label: '5', value: '5' },
  { label: '10', value: '10' },
  { label: '15', value: '15' },
  { label: '20', value: '20' },
  { label: '25', value: '25' },
  { label: '50', value: '50' },
];

export function TransactionPagination({
  currentPage,
  pageSize,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
  onPageSizeChange,
  className = '',
}: TransactionPaginationProps) {
  const pageNumbers = renderPaginationNumbers(currentPage, totalPages);

  return (
    <div
      className={`flex md:flex-row flex-col md:items-center items-end justify-between gap-3 ${className}`}
    >
      <p className="hidden md:block text-body-md lg:text-body-lg leading-body text-gray-700">
        Mostrando {itemsPerPage} de {totalItems}
      </p>
      <nav className="self-center md:self-auto flex items-center justify-center md:gap-3 gap-1.5">
        <Button
          label="<"
          kind="secondary"
          size="md:h-11 h-8"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        />
        <div className="flex md:gap-3 gap-1.5">
          {pageNumbers.map((page) => {
            if (typeof page === 'string' && page.startsWith('...')) {
              return (
                <span key={page} className="self-end">
                  ...
                </span>
              );
            }
            const isCurrent = page === currentPage;
            return (
              <Button
                key={page}
                label={page.toString()}
                kind={isCurrent ? 'primary' : 'secondary'}
                aria-current={isCurrent ? 'page' : undefined}
                onClick={() => onPageChange(Number(page))}
                size="md:h-11 h-8"
              />
            );
          })}
        </div>
        <Button
          label=">"
          kind="secondary"
          size="md:h-11 h-8"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        />
      </nav>
      <div className="flex items-center justify-between md:w-auto w-full">
        <p className="block md:hidden text-body-md lg:text-body-lg leading-body text-gray-700">
          Mostrando {itemsPerPage} de {totalItems}
        </p>
        <div>
          <Select
            options={pageSizeOptions}
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
          />
        </div>
      </div>
    </div>
  );
}
