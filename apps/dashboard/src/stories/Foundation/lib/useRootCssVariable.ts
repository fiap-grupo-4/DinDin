"use client";

import { useEffect, useState } from "react";

export function useRootCssVariable(name: string): string {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(
      getComputedStyle(document.documentElement).getPropertyValue(name).trim(),
    );
  }, [name]);

  return value;
}
