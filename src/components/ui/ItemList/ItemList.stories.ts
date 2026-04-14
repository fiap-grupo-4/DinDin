import { createElement } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { ItemList } from "./ItemList";

const meta = {
  title: "Components/ItemList",
  component: ItemList,
  decorators: [
    (Story) =>
      createElement(
        "ul",
        { className: "flex w-full max-w-md flex-col gap-5" },
        createElement(Story),
      ),
  ],
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    id: "tx-1",
    value: 1500.5,
    date: new Date("2026-04-12T10:00:00"),
    kind: "expense",
    onViewItem: fn(),
    onEditItem: fn(),
    onDeleteItem: fn(),
  },
} satisfies Meta<typeof ItemList>;

export default meta;
type Story = StoryObj<typeof ItemList>;

export const Expense: Story = {
  args: {
    kind: "expense",
    value: 89.9,
  },
};

export const Income: Story = {
  args: {
    kind: "income",
    value: 3200,
    date: new Date("2026-04-01T14:30:00"),
  },
};
