import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { DeleteTransactionModal } from "./DeleteTransactionModal";
import { Transaction } from "@/src/types/transactions.types";

const mockTransaction: Transaction = {
    id: "1",
    description: "Mensalidade Academia",
    value: 120.0,
    transactionType: "expense",
    createdAt: new Date("2026-04-10T14:20:00"),
};

const meta = {
    title: "Features/TransactionModal/DeleteTransactionModal",
    component: DeleteTransactionModal,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: {
        isOpen: true,
        transaction: mockTransaction,
        onClose: fn(),
        onConfirm: fn(),
    },
} satisfies Meta<typeof DeleteTransactionModal>;

export default meta;
type Story = StoryObj<typeof DeleteTransactionModal>;

export const Default: Story = {};