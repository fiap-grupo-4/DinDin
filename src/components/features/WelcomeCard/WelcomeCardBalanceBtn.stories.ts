import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { WelcomeCardBalanceBtn } from "./WelcomeCardBalanceBtn";

const meta = {
  title: "Features/WelcomeCardBalanceBtn",
  component: WelcomeCardBalanceBtn,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    balance: 12847.32,
  },
} satisfies Meta<typeof WelcomeCardBalanceBtn>;

export default meta;
type Story = StoryObj<typeof WelcomeCardBalanceBtn>;

export const Default: Story = {};

export const NegativeBalance: Story = {
  args: {
    balance: -120.5,
  },
};
