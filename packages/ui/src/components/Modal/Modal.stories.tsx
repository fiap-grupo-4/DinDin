import { useState, type ComponentProps } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "../Button";
import { Modal } from "./Modal";

function ModalWithTrigger(
  args: Omit<ComponentProps<typeof Modal>, "isOpen" | "onClose">,
) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button label="Abrir modal" onClick={() => setOpen(true)} />
      <Modal {...args} isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}

const meta = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    isOpen: { table: { disable: true } },
    onClose: { table: { disable: true } },
  },
  args: {
    title: "Título do Modal",
    kind: "default",
    maxWidth: "md",
    children: "Conteúdo interno do Modal de exemplo.",
  },
  render: (args) => <ModalWithTrigger {...args} />,
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {};

export const Danger: Story = {
  args: {
    title: "Aviso Importante",
    kind: "danger",
    maxWidth: "sm",
    children: "Tem certeza que deseja prosseguir com esta ação destrutiva?",
  },
};
