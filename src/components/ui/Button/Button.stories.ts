import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    kind: "primary",
    label: "Primary Button",
  },
};

export const Secondary: Story = {
  args: {
    kind: "secondary",
    label: "Secondary Button",
  },
};

export const Danger: Story = {
  args: {
    kind: "danger",
    label: "Danger Button",
  },
};
