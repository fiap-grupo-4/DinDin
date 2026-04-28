"use client";

import { Transaction } from "@/src/types/transactions.types";
import { Container } from "../../ui/Container";
import { Heading } from "../../ui/Heading";
import { ItemList } from "../../ui/ItemList";
import { Link } from "../../ui/Link";

interface RecentsTransactionsCardProps {
  transactions: Transaction[];
}

export function RecentsTransactionsCard({
  transactions,
}: RecentsTransactionsCardProps) {
  const recentsTransactions =
    transactions.length > 5 ? transactions.slice(0, 5) : transactions;

  const handleEditTranscation = (id: string) => {};
  const handleDeleteTranscation = (id: string) => {};

  return (
    <Container>
      <Heading title="Transações Recentes" className="mb-11" />
      <ul className="flex flex-col gap-5">
        {recentsTransactions.map((transaction) => (
          <ItemList
            key={transaction.id}
            id={transaction.id}
            value={transaction.value}
            date={transaction.createdAt}
            kind={transaction.transactionType}
            description={transaction.description}
            onEditItem={handleEditTranscation}
            onDeleteItem={handleDeleteTranscation}
          />
        ))}
      </ul>
      <Link
        label="Veja Mais"
        iconRight="ArrowRightSLine"
        href="/transactions"
        className="mt-10 w-fit ml-auto"
      />
    </Container>
  );
}
