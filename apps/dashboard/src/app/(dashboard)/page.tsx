import { RecentsTransactionsList, BalanceButton } from './components';
import {
  FinancialPieChart,
  FinancialLineChart,
} from '../../components/FinancialChartsSection';
import { Heading, ProfilePicture, Container, Link } from '@dindin/ui';
import { getTransactionsAction } from './actions';
import { buildFinancialChartData } from '@/src/lib/utils/chartData';
import { ProgressBar } from './components/ProgressBar/ProgressBar';

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
            real e tenha mais controle sobre sua vida financeira — tudo em um só
            lugar.
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
      <Container className="order-1 lg:order-0 lg:col-span-4">
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

      <Container className="order-2 lg:order-0 lg:col-span-3">
        <FinancialPieChart data={chartData.pieData} />
      </Container>

      <div className="order-4 lg:order-0 lg:col-span-3 lg:row-span-2 flex flex-col">
        <Container className="mb-5 flex-1">
          <Heading title="Transações Recentes" className="mb-8 lg:mb-11" />
          <RecentsTransactionsList transactions={transactions} />
          <Link
            label="Veja Mais"
            href="/transactions"
            iconRight="ArrowRightSLine"
            className="mt-8 w-fit ml-auto"
          />
        </Container>
        <Container>
          <Heading title="Minhas economias" className="mb-8 lg:mb-11" />
          <div className="flex flex-col gap-3">
            <ProgressBar
              title="Viagem RJ"
              currentValue={869}
              totalValue={5500}
            />
            <ProgressBar
              title="Carro"
              currentValue={42300}
              totalValue={70000}
            />
          </div>
        </Container>
      </div>

      <Container className="order-3 lg:order-0 lg:col-span-7">
        <FinancialLineChart data={chartData.lineData} />
      </Container>
    </>
  );
}
