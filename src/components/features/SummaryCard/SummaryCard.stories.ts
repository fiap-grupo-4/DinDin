import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { SummaryCard } from "./SummaryCard";

const meta = {
  title: "Features/SummaryCard",
  component: SummaryCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    incomes: 8420.5,
    expenses: 2150.75,
  },
} satisfies Meta<typeof SummaryCard>;

export default meta;
type Story = StoryObj<typeof SummaryCard>;

export const Default: Story = {};
