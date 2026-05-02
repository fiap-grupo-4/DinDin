"use client";

import { Transaction, TransactionType } from "@/src/types/transactions.types";
import { Container } from "../../ui/Container";
import { Heading } from "../../ui/Heading";
import { ItemList } from "../../ui/ItemList";
import { Link } from "../../ui/Link";
import { Button } from "../../ui/Button";
import { Input } from "../../ui/Input";
import { Select } from "../../ui/Select";
import { DateInput } from "../../ui/DateInput";
import { SelectOption } from "../../ui/Select/Select";
import { useState } from "react";
import { maskUtils } from "@/src/lib/utils";

interface TransactionsCardProps {
  transactions: Transaction[];
}

const transactionTypes: SelectOption[] = [
  { label: "Todas as transações", value: "" },
  { label: "Entrada", value: "income" },
  { label: "Saída", value: "expense" },
];

const initialFilterForm = {
  transactionType: transactionTypes[0].value,
  date: "",
  description: "",
};

export function TransactionsCard({ transactions }: TransactionsCardProps) {
  const [filterForm, setFilterForm] =
    useState<typeof initialFilterForm>(initialFilterForm);
  const [filteredTransactions, setFilteredTransactions] =
    useState<Transaction[]>(transactions);

  const handleNewTransaction = () => {
    console.log("open new transaction modal");
  };

  const handleEditTranscation = (id: string) => {};
  const handleDeleteTranscation = (id: string) => {};

  const handleDescriptionFilter = (
    description: string,
    filterValue: string,
  ): boolean => {
    if (filterValue === "") return true;
    return description.toLowerCase().includes(filterValue.toLowerCase());
  };

  const handleTranscationTypeFilter = (
    transactionType: TransactionType,
    filterValue: string,
  ): boolean => {
    if (filterValue === "") return true;
    return transactionType === (filterValue as TransactionType);
  };

  const handleDateFilter = (date: Date, filterValue: string) => {
    if (filterValue === "") return true;
    return maskUtils.getDateMask(date) === filterValue;
  };

  const handleFilterFormSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const filtered = transactions.filter((transaction) => {
      return (
        handleDescriptionFilter(
          transaction.description || "",
          filterForm.description,
        ) &&
        handleTranscationTypeFilter(
          transaction.transactionType,
          filterForm.transactionType,
        ) &&
        handleDateFilter(transaction.createdAt, filterForm.date)
      );
    });
    setFilteredTransactions(filtered);
  };

  const handleFilterFormReset = () => {
    setFilterForm(initialFilterForm);
    setFilteredTransactions(transactions);
  };

  return (
    <>
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
        <form onSubmit={handleFilterFormSubmit}>
          <div className="flex gap-4 mb-5">
            <Input
              label="Busca"
              iconRight="SearchLine"
              placeholder="Buscar transações..."
              value={filterForm.description}
              onChange={(e) =>
                setFilterForm({ ...filterForm, description: e.target.value })
              }
            />
            <Select
              label="Tipo"
              options={transactionTypes}
              value={filterForm.transactionType}
              onChange={(e) =>
                setFilterForm({
                  ...filterForm,
                  transactionType: e.target.value,
                })
              }
            />
            <DateInput
              value={filterForm.date}
              onChange={(value) =>
                setFilterForm({ ...filterForm, date: value })
              }
            />
          </div>
          <div className="flex justify-end gap-4 mb-10">
            <Button
              label="Limpar"
              size="sm"
              kind="secondary"
              onClick={handleFilterFormReset}
            />
            <Button label="Filtrar" size="sm" type="submit" />
          </div>
        </form>
        {filteredTransactions.length > 0 ? (
          <div className="max-h-100 overflow-auto">
            <ul className="flex flex-col gap-5">
              {filteredTransactions.map((transaction) => (
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
        ) : (
          <div className="text-center mb-8">
            <p>Nenhuma transação encontrada.</p>
          </div>
        )}
      </Container>
    </>
  );
}
