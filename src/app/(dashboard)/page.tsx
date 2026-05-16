import {
  RecentsTransactionsCard,
  WelcomeCard,
  SummaryCardDetails,
} from './components';
import { Heading } from '@/src/components/ui/Heading';
import { Container } from '@/src/components/ui/Container';
import { transactionService } from '@/src/services/transactions';

export default async function DashboardPage() {
  const getTransactions = async () => {
    try {
      const transactions =
        await transactionService.getTransactions('?_sort=-createdAt');
      return transactions;
    } catch (error) {
      console.error('Error on getting Transactions', error);
      return [];
    }
  };

  const transactions = await getTransactions();

  const { totalIncomes, totalExpenses } = transactions.reduce(
    (prev, curr) => {
      let totalIncomes = prev.totalIncomes;
      let totalExpenses = prev.totalExpenses;

      switch (curr.transactionType) {
        case 'income':
          totalIncomes += curr.value;
          break;
        case 'expense':
          totalExpenses += curr.value;
          break;
      }

      return { totalIncomes, totalExpenses };
    },
    { totalIncomes: 0, totalExpenses: 0 }
  );

  const balance = totalIncomes - totalExpenses;

  return (
    <>
      <div className="mt-6 lg:mt-0 lg:col-span-6 flex flex-col gap-3">
        <WelcomeCard balance={balance} />
        <Container>
          <Heading
            title="Resumo Financeiro"
            subtitle="Veja um resumo de suas transações do último mês."
            className="mb-6 lg:mb-11"
          />
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-0 lg:mb-2">
            <SummaryCardDetails
              label="Receita"
              value={totalIncomes}
              kind="income"
            />
            <SummaryCardDetails
              label="Despesa"
              value={totalExpenses}
              kind="expense"
            />
          </div>
        </Container>
      </div>
      <div className="mb-6 lg:mb-0 w-full lg:col-span-4">
        <RecentsTransactionsCard transactions={transactions} />
      </div>
    </>
  );
}
