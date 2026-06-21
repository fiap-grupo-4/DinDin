import { validationUtils } from './validation';

const getCurrencyMask = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const getDateMask = (value: string | Date): string => {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(value));
};

const parseDateString = (value: string): Date | null => {
  const parts = value.split('/');
  if (parts.length !== 3) return null;
  const [day, month, year] = parts.map(Number);
  if ([day, month, year].some(Number.isNaN) || year < 1000 || year > 9999) {
    return null;
  }
  if (!validationUtils.isValidDate(day, month, year)) return null;
  return new Date(year, month - 1, day);
};

export const maskUtils = {
  getCurrencyMask,
  getDateMask,
  parseDateString,
};
