import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Icon, type IconName } from "./Icon";

const iconOptions: IconName[] = [
  "EyeLine",
  "PencilLine",
  "DeleteBin6Line",
  "CheckLine",
  "SearchLine",
  "DashboardLine",
  "ArrowRightSLine",
];

const meta = {
  title: "Components/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "select",
      options: iconOptions,
    },
  },
  args: {
    name: "CheckLine",
    size: 24,
    className: "text-gray-800",
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {};

export const Small: Story = {
  args: {
    name: "CheckLine",
    size: 16,
  },
};

export const Large: Story = {
  args: {
    name: "CheckLine",
    size: 40,
  },
};
