import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";

import { Input } from "./Input";

const meta = {
  title: "Components/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    label: "Input",
    placeholder: "Write here"
  },
};

export const Error: Story = {
  args: {
    label: "Input",
    placeholder: "Write here",
    state: "error"
  },
};

export const Required: Story = {
  args: {
    label: "Input",
    required: true
  },
};

export const HelperText: Story = {
  args: {
    label: "Input",
    helperText: "This is an input"
  },
};

export const LeftIcon: Story = {
  args: {
    label: "Input",
    iconLeft: "StarLine"
  },
};

export const RightIcon: Story = {
  args: {
    label: "Input",
    iconRight: "StarLine"
  },
};

export const Disabled: Story = {
  args: {
    label: "Input",
    disabled: true,
    placeholder: "Don't write here"
  },
};