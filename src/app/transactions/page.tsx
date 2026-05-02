import { TransactionsCard } from "../../components/features/TransactionsCard";
import { transactionService } from "../../services/transactions";

export default async function Transactions() {
  const getTransactions = async () => {
    try {
      const transactions =
        await transactionService.getTransactions("?_sort=-createdAt");
      return transactions;
    } catch (error) {
      console.error("Error on getting Transactions", error);
      return [];
    }
  };

  const transactions = await getTransactions();

  return (
    <>
      <div className="w-full md:col-span-8 md:col-start-2">
        <TransactionsCard transactions={transactions} />
      </div>
    </>
  );
}
