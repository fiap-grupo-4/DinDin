"use client";

import { useRootCssVariable } from "./useRootCssVariable";

type CssVarValueProps = {
  name: string;
  uppercase?: boolean;
};

export function CssVarValue({ name, uppercase }: CssVarValueProps) {
  const value = useRootCssVariable(name);
  const display = uppercase ? value.toUpperCase() : value;
  return <code>{display || "…"}</code>;
}
