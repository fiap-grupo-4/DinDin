import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Heading } from "./Heading";

const meta = {
  title: "Components/Heading",
  component: Heading,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    title: "Resumo",
    subtitle: "Últimos 30 dias",
    className: "",
    dotColor: "brand",
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof Heading>;

export const WithSubtitle: Story = {};

export const TitleOnly: Story = {
  args: {
    title: "Transações recentes",
    subtitle: undefined,
  },
};

export const DangerDot: Story = {
  args: {
    title: "Confirmar Exclusão",
    subtitle: "Atenção: esta ação não pode ser desfeita.",
    dotColor: "danger",
  },
};
