import type { Meta, StoryObj } from "@storybook/react-vite";

import { BaseLayout } from "./BaseLayout";

const Content = () => {
  return (
    <div className="col-span-6 my-8">
      <h1>Layout Base</h1>
      <p>Este é um exemplo do layout base.</p>
    </div>
  );
};

const meta = {
  title: "Components/BaseLayout",
  component: BaseLayout,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof BaseLayout>;

export default meta;
type Story = StoryObj<typeof BaseLayout>;

export const Default: Story = {
  args: {
    children: <Content />,
  },
};
