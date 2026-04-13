import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export function Container({ children }: ContainerProps) {
  return <div className="bg-white rounded-xl p-6 shadow">{children}</div>;
}
