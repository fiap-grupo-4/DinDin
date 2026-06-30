import {
  RecentsTransactionsList,
  BalanceButton,
  SummaryCardDetails,
} from './components';
import {
  FinancialPieChart,
  FinancialBarChart,
} from './components/charts/FinancialChartsSection';
import { Heading, ProfilePicture, Container, Link } from '@dindin/ui';
import { getTransactionsAction } from './actions';
import { buildFinancialChartData } from '@/src/lib/utils/chartData';

export default async function DashboardPage() {
  const result = await getTransactionsAction();

  if (!result.success) {
    return (
      <>
        <Container className="lg:col-span-6">
          <div className="flex items-center gap-3">
            <ProfilePicture kind="primary" profileName="fulano de tal" />
            <h1>Seja bem-vindo, Fulano de Tal</h1>
          </div>
          <p className="text-body-md lg:text-body-lg leading-body text-gray-700 my-4 md:my-7 lg:my-14">
            Com o DinDin, você acompanha seu dinheiro de forma simples e
            organizada. Gerencie suas transações, visualize seu saldo em tempo
            real e tenha mais controle sobre sua vida financeira — tudo em um
            só lugar.
          </p>
        </Container>
        <Container className="lg:col-span-4 self-start">
          <p className="text-center text-danger-400">{result.error}</p>
        </Container>
      </>
    );
  }

  const transactions = result.data;

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
  const chartData = buildFinancialChartData(
    transactions,
    totalIncomes,
    totalExpenses
  );

  return (
    <>
      <Container className="order-1 lg:order-none lg:col-span-6">
        <div className="flex items-center gap-3">
          <ProfilePicture profileName="fulano de tal" kind="primary" />
          <h1>Seja bem-vindo, Fulano de Tal</h1>
        </div>
        <p className="text-body-md lg:text-body-lg leading-body text-gray-700 my-4 md:my-7 lg:my-14">
          Com o DinDin, você acompanha seu dinheiro de forma simples e
          organizada. Gerencie suas transações, visualize seu saldo em tempo
          real e tenha mais controle sobre sua vida financeira — tudo em um só
          lugar.
        </p>
        <BalanceButton balance={balance} />
      </Container>

      <Container className="order-5 lg:order-none lg:col-span-4 lg:row-span-2 self-start">
        <Heading title="Transações Recentes" className="mb-8 lg:mb-11" />
        <RecentsTransactionsList transactions={transactions} />
        <Link
          label="Veja Mais"
          href="/transactions"
          iconRight="ArrowRightSLine"
          className="mt-10 w-fit ml-auto"
        />
      </Container>

      <Container className="order-2 lg:order-none lg:col-span-6">
        <Heading
          title="Resumo Financeiro"
          subtitle="Veja um resumo de suas transações do último mês."
          className="mb-6 lg:mb-8"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

      <Container className="order-3 lg:order-none lg:col-span-4">
        <FinancialPieChart data={chartData.pieData} />
      </Container>

      <Container className="order-4 lg:order-none lg:col-span-6">
        <FinancialBarChart data={chartData.barData} />
      </Container>
    </>
  );
}
