"use client";

import { Transaction } from "@/src/types/transactions.types";
import { Container } from "../../ui/Container";
import { Heading } from "../../ui/Heading";
import { ItemList } from "../../ui/ItemList";
import { Link } from "../../ui/Link";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";

interface TransactionsCardProps {
  transactions: Transaction[];
}

export function TransactionsCard({
  transactions,
}: TransactionsCardProps) {
  const handleNewTransaction = () => {
    console.log("open new transaction modal");
  };

  const handleEditTranscation = (id: string) => {};
  const handleDeleteTranscation = (id: string) => {};

  return (
    <div>
      <Link
        label="Voltar"
        iconLeft="ArrowLeftSLine"
        href="/"
        className="w-fit"
      />
      <Container>
        <div className="flex justify-between">
          <Heading title="Transações Recentes" className="mb-11" />
          <Button
            label="Nova Transação"
            size="sm"
            icon="AddLine"
            onClick={handleNewTransaction}
          />
        </div>
        <div className="flex gap-4 mb-5">
          <Input
            label="Busca"
            iconRight="SearchLine"
            placeholder="Buscar transações..."
          />
          <Input
            label="Tipo"
            iconRight="ArrowDownSLine"
            placeholder="Todas as transações"
          />
          <Input
            label="Data"
            iconRight="CalendarLine"
            placeholder="Selecione uma data"
          />
        </div>
        <div className="flex justify-end gap-4 mb-10">
          <Button
            label="Limpar"
            size="sm"
            kind="secondary"
          />
          <Button
            label="Filtrar"
            size="sm"
          />
        </div>
        <div className="max-h-100 overflow-auto">
          <ul className="flex flex-col gap-5">
            {transactions.map((transaction) => (
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
        </div>
      </Container>
    </div>
  );
}
