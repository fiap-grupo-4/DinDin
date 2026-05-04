import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { CreateTransactionModal } from "./CreateTransactionModal";

const meta = {
    title: "Features/TransactionModal/CreateTransactionModal",
    component: CreateTransactionModal,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: {
        isOpen: true,
        onClose: fn(),
        onCreate: fn(),
    },
} satisfies Meta<typeof CreateTransactionModal>;

export default meta;
type Story = StoryObj<typeof CreateTransactionModal>;

export const Default: Story = {};