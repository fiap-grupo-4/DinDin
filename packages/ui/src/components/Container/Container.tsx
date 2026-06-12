import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`bg-white rounded-xl p-6 shadow ${className}`}>
      {children}
    </div>
  );
}
