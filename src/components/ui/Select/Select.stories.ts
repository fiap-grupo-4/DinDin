import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Select } from "./Select";

const meta = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  args: {
    label: "Opções",
    options: [
      { label: "Opção 1", value: "op1" },
      { label: "Opção 2", value: "op2" },
      { label: "Opção 3", value: "op3" },
    ],
  },
};
