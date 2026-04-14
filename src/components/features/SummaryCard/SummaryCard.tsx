"use client";

import { Container } from "../../ui/Container";
import { Heading } from "../../ui/Heading";
import { SummaryCardDetails } from "./SummaryCardDetails";

interface SummaryCardProps {
  incomes: number;
  expenses: number;
}

export function SummaryCard({ incomes, expenses }: SummaryCardProps) {
  return (
    <Container>
      <Heading
        title="Resumo Financeiro"
        subtitle="Veja um resumo de suas transações do último mês."
        className="mb-6"
      />
      <div className="flex items-center justify-center gap-6">
        <SummaryCardDetails label="Receita" value={incomes} kind="income" />
        <SummaryCardDetails label="Despesa" value={expenses} kind="expense" />
      </div>
    </Container>
  );
}
