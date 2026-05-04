import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import type { Transaction } from "@/src/types/transactions.types";

import { TransactionsCard } from "./TransactionsCard";

const fewTransactions: Transaction[] = [
  {
    id: "t1",
    value: 89.9,
    transactionType: "expense",
    createdAt: new Date("2026-04-10T14:20:00"),
    description: "Mercado"
  },
  {
    id: "t2",
    value: 3200,
    transactionType: "income",
    createdAt: new Date("2026-04-08T09:00:00"),
    description: "Salário"
  },
  {
    id: "t3",
    value: 45,
    transactionType: "expense",
    createdAt: new Date("2026-04-05T18:30:00"),
  },
];

const manyTransactions: Transaction[] = [
  ...fewTransactions,
  {
    id: "t4",
    value: 200,
    transactionType: "income",
    createdAt: new Date("2026-04-04T11:00:00"),
  },
  {
    id: "t5",
    value: 15.5,
    transactionType: "expense",
    createdAt: new Date("2026-04-03T08:15:00"),
    description: "Salgado"
  },
  {
    id: "t6",
    value: 999,
    transactionType: "income",
    createdAt: new Date("2026-04-02T16:45:00"),
  },
  {
    id: "t7",
    value: 12,
    transactionType: "expense",
    createdAt: new Date("2026-04-01T12:00:00"),
  },
];

const meta = {
  title: "Features/TransactionsCard",
  component: TransactionsCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    transactions: fewTransactions,
  },
} satisfies Meta<typeof TransactionsCard>;

export default meta;
type Story = StoryObj<typeof TransactionsCard>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    transactions: [],
  },
};

export const Overflow: Story = {
  args: {
    transactions: manyTransactions,
  },
};
