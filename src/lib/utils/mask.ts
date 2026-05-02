const getCurrencyMask = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const getDateMask = (value: Date): string => {
  return new Intl.DateTimeFormat("pt-BR").format(new Date(value));
};

const applyDateMask = (value: string): string => {
  const numbers = value.replace(/\D/g, "").slice(0, 8);
  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 4) return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;
  return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4)}`;
};

export const maskUtils = { getCurrencyMask, getDateMask, applyDateMask };
