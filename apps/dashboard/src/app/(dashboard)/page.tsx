import {
  RecentsTransactionsList,
  BalanceButton,
  SummaryCardDetails,
} from './components';
import { Heading, ProfilePicture, Container, Link } from '@dindin/ui';
import { getTransactionsAction } from './actions';

export default async function DashboardPage() {
  const transactions = await getTransactionsAction();

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
        <Container>
          <div className="flex items-center gap-3">
            <ProfilePicture profileName="fulano de tal" />
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
      <Container className="mb-6 lg:mb-0 w-full lg:col-span-4">
        <Heading title="Transações Recentes" className="mb-11" />
        <RecentsTransactionsList transactions={transactions} />
        <Link
          label="Veja Mais"
          href="/transactions"
          iconRight="ArrowRightSLine"
          className="mt-10 w-fit ml-auto"
        />
      </Container>
    </>
  );
}
