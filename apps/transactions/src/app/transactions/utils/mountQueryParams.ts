import { maskUtils } from '@/src/lib/utils';
import { FilterFormValues } from '../types';

type TransactionQueryParams = {
  page: number;
  pageSize: number;
  filters: FilterFormValues | null;
};

const mapFilters = (filters: FilterFormValues): string[] => {
  const filterMappers: Partial<
    Record<keyof FilterFormValues, (val: string) => string>
  > = {
    date: (val) =>
      `createdAt:eq=${maskUtils.parseDateString(val)?.toISOString()}`,
    description: (val) => `description:contains=${val}`,
    transactionType: (val) => `transactionType:eq=${val}`,
  };

  return Object.entries(filters)
    .filter(
      ([key, value]) =>
        value !== '' && filterMappers[key as keyof FilterFormValues]
    )
    .map(([key, value]) =>
      filterMappers[key as keyof FilterFormValues]!(value)
    );
};

const mountFilterQuery = (filters: FilterFormValues): string => {
  const queryParts = mapFilters(filters);
  return queryParts.length > 0 ? `&${queryParts.join('&')}` : '';
};

export const mountQueryParams = (params: TransactionQueryParams): string => {
  const filters =
    params.filters != null ? mountFilterQuery(params.filters) : '';

  return `&_page=${params.page}&_per_page=${params.pageSize}${filters}`;
};
