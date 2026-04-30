"use client";

import { Transaction } from "@/src/types/transactions.types";
import { Container } from "../../ui/Container";
import { Heading } from "../../ui/Heading";
import { ItemList } from "../../ui/ItemList";
import { Link } from "../../ui/Link";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import { Select } from "../../ui/Select";
import { DateInput } from "../../ui/DateInput";

interface TransactionsCardProps {
  transactions: Transaction[];
}

const transactionTypes = [
  { label: "Entrada", value: "income" },
  { label: "Saída", value: "expense" },
];

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
          <Select label="Tipo">
            <option value="">Todas as transações</option>
            {transactionTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </Select>
          <DateInput />
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
