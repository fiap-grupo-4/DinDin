import { Transaction } from "@/src/types/transactions.types";
import { httpClient } from "../http";

const getTransactions = async (queryOptions = ""): Promise<Transaction[]> => {
  const res = await httpClient.get<Transaction[]>(
    `/transactions${queryOptions}`,
  );
  return res;
};

export const transactionService = { getTransactions };
