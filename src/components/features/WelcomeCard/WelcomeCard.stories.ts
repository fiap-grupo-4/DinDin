import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { WelcomeCard } from "./WelcomeCard";

const meta = {
  title: "Features/WelcomeCard",
  component: WelcomeCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    balance: 12847.32,
  },
} satisfies Meta<typeof WelcomeCard>;

export default meta;
type Story = StoryObj<typeof WelcomeCard>;

export const Default: Story = {};

export const NegativeBalance: Story = {
  args: {
    balance: -450.9,
  },
};
