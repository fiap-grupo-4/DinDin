import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SummaryCardDetails } from "./SummaryCardDetails";

const meta = {
  title: "Features/SummaryCardDetails",
  component: SummaryCardDetails,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof SummaryCardDetails>;

export default meta;
type Story = StoryObj<typeof SummaryCardDetails>;

export const Income: Story = {
  args: {
    label: "Receita",
    value: 5420,
    kind: "income",
  },
};

export const Expense: Story = {
  args: {
    label: "Despesa",
    value: 890.25,
    kind: "expense",
  },
};
