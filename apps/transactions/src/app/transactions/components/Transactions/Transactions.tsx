import { Heading } from '@dindin/ui';
import { TransactionsProps } from '../../types';
import { CreateTransaction } from '../CreateTransaction';
import TransactionsContent from './TransactionsContent';

export default function Transactions({ transactions }: TransactionsProps) {
  return (
    <>
      <div className="mb-4 flex flex-col gap-3 md:mb-11 md:flex-row md:items-center md:justify-between">
        <Heading title="Transações" />
        <CreateTransaction />
      </div>

      <TransactionsContent transactions={transactions} />
    </>
  );
}
