import { transactionService } from '@/src/services/transactions';
import { Transactions } from './components/Transactions';
import { Container, Link } from '@dindin/ui';

export default async function TransactionsPage() {
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

  return (
    <div className="w-full md:col-span-8 md:col-start-2">
      <Link
        label="Voltar"
        iconLeft="ArrowLeftSLine"
        href="/"
        className="w-fit mt-8 mb-4"
      />
      <Container className="mb-6">
        <Transactions transactions={transactions} />
      </Container>
    </div>
  );
}
