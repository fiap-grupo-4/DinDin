const getCurrencyMask = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

const getDateMask = (value: Date): string => {
  return new Intl.DateTimeFormat("pt-BR").format(new Date(value));
};

export const maskUtils = { getCurrencyMask, getDateMask };
