import { getTransactionsAction } from './actions';
import { CreateTransaction } from './components/CreateTransaction';
import { Transactions } from './components/Transactions';
import { Container, Heading } from '@dindin/ui';

export default async function TransactionsPage() {
  const result = await getTransactionsAction('&_page=1&_per_page=10');

  return (
    <div className="gap-3 col-span-10 flex flex-col">
      <Container className="flex-1">
        <>
          <div className="mb-4 flex flex-col gap-3 md:mb-11 md:flex-row md:items-center md:justify-between">
            <Heading title="Transações" />
            {result.success && <CreateTransaction />}
          </div>
          {!result.success ? (
            <p className="text-center mb-8">{result.error}</p>
          ) : (
            <Transactions data={result.data} />
          )}
        </>
      </Container>
    </div>
  );
}
