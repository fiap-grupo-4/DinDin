import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Header as HeaderComponent } from "./Header";

const meta = {
  title: "Components/Header",
  component: HeaderComponent,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HeaderComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Header: Story = {};
