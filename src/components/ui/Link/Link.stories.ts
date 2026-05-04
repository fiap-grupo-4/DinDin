import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Link as LinkComponent } from "./Link";

const meta = {
  title: "Components/Link",
  component: LinkComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LinkComponent>;

export default meta;
type Story = StoryObj<typeof LinkComponent>;

export const Link: Story = {
  args: {
    label: "Link to nowhere",
    href: "#",
  },
};

export const LeftIcon: Story = {
  args: {
    label: "Link to nowhere",
    href: "#",
    iconLeft: "StarLine"
  },
};

export const RightIcon: Story = {
  args: {
    label: "Link to nowhere",
    href: "#",
    iconRight: "StarLine"
  },
};
