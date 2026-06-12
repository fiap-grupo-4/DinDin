import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Container } from "./Container";

const meta = {
  title: "Components/Container",
  component: Container,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    children:
      "White rounded card with padding and shadow. Place any content inside.",
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof Container>;

export const Default: Story = {};
