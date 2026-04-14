import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { ProfilePicture } from "./ProfilePicture";

const meta = {
  title: "Components/ProfilePicture",
  component: ProfilePicture,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    profileName: "Maria",
  },
} satisfies Meta<typeof ProfilePicture>;

export default meta;
type Story = StoryObj<typeof ProfilePicture>;

export const Default: Story = {};
