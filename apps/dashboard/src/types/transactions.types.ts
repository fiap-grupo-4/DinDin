export type TransactionType = "income" | "expense";

export interface Transaction {
  id: string;
  value: number;
  transactionType: TransactionType;
  description?: string;
  createdAt: Date;
}
