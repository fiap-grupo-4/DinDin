import type { Meta, StoryObj } from "@storybook/react-vite";

import { Header as HeaderComponent } from "./Header";
import { fn } from "storybook/test";

const meta = {
  title: "Components/Header",
  component: HeaderComponent,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    onToggle: fn(),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof HeaderComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Header: Story = {};
