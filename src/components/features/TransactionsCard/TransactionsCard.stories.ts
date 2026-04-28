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
    description: "Mensalidade da Academia"
  },
  {
    id: "t3",
    value: 45,
    transactionType: "expense",
    createdAt: new Date("2026-04-05T18:30:00"),
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
