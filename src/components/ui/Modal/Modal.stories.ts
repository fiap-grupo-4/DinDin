import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Modal } from "./Modal";

const meta = {
    title: "Components/Modal",
    component: Modal,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: {
        isOpen: true,
        title: "Título do Modal",
        dotColor: "brand",
        maxWidth: "md",
        children: "Conteúdo interno do Modal de exemplo.",
    },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {};

export const Danger: Story = {
    args: {
        title: "Aviso Importante",
        dotColor: "danger",
        maxWidth: "sm",
        children: "Tem certeza que deseja prosseguir com esta ação destrutiva?",
    },
};