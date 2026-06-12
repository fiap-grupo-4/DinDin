import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Select } from "./Select";

const options = [
  { label: "Opção 1", value: "op1" },
  { label: "Opção 2", value: "op2" },
  { label: "Opção 3", value: "op3" },
];

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
    options: options,
  },
};

export const Error: Story = {
  args: {
    label: "Opções",
    state: "error",
    options: options,
  },
};

export const Required: Story = {
  args: {
    label: "Opções",
    required: true,
    options: options,
  },
};

export const HelperText: Story = {
  args: {
    label: "Opções",
    helperText: "This is a select",
    options: options,
  },
};

export const LeftIcon: Story = {
  args: {
    label: "Opções",
    iconLeft: "StarLine",
    options: options,
  },
};

export const Disabled: Story = {
  args: {
    label: "Opções",
    disabled: true,
    options: options,
  },
};
