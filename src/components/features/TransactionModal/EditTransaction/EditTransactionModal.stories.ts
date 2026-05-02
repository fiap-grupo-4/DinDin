import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { EditTransactionModal } from "./EditTransactionModal";
import { Transaction } from "@/src/types/transactions.types";

const mockTransaction: Transaction = {
    id: "1",
    description: "Mercado",
    value: 150.0,
    transactionType: "expense",
    createdAt: new Date("2026-04-12T10:00:00"),
};

const meta = {
    title: "Features/TransactionModal/EditTransactionModal",
    component: EditTransactionModal,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: {
        isOpen: true,
        transaction: mockTransaction,
    },
} satisfies Meta<typeof EditTransactionModal>;

export default meta;
type Story = StoryObj<typeof EditTransactionModal>;

export const Default: Story = {};