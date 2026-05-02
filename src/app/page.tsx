import { SummaryCard } from "../components/features/SummaryCard";
import { RecentsTransactionsCard } from "../components/features/RecentsTransactionsCard";
import { WelcomeCard } from "../components/features/WelcomeCard";
import { transactionService } from "../services/transactions";

export default async function Home() {
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

  const { totalIncomes, totalExpenses } = transactions.reduce(
    (prev, curr) => {
      let totalIncomes = prev.totalIncomes;
      let totalExpenses = prev.totalExpenses;

      switch (curr.transactionType) {
        case "income":
          totalIncomes += curr.value;
          break;
        case "expense":
          totalExpenses += curr.value;
          break;
      }

      return { totalIncomes, totalExpenses };
    },
    { totalIncomes: 0, totalExpenses: 0 },
  );

  const balance = totalIncomes - totalExpenses;

  return (
    <>
      <div className="mt-6 lg:mt-0 lg:col-span-6 flex flex-col gap-3">
        <WelcomeCard balance={balance} />
        <SummaryCard incomes={totalIncomes} expenses={totalExpenses} />
      </div>
      <div className="mb-6 lg:mb-0 w-full lg:col-span-4">
        <RecentsTransactionsCard transactions={transactions} />
      </div>
    </>
  );
}
