import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { DateInput } from "./DateInput";

const meta = {
  title: "Components/DateInput",
  component: DateInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DateInput>;

export default meta;
type Story = StoryObj<typeof DateInput>;

export const Default: Story = {};