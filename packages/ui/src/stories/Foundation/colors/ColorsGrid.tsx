"use client";

import { CssVarValue } from "../lib/CssVarValue";

type ColorsPaletteProps = {
  tokens: readonly string[];
  columns?: number;
};

function ColorSwatch({ token }: { token: string }) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-gray-300 bg-gray-200 p-3">
      <div
        className="h-14 w-full rounded-md border border-gray-400"
        style={{ backgroundColor: `var(${token})` }}
      />
      <code className="wrap-break-word text-[0.8125rem] leading-snug text-gray-700">
        {token}
      </code>
      <div className="text-[0.8125rem] text-gray-600">
        <CssVarValue name={token} uppercase />
      </div>
    </div>
  );
}

export function ColorsPalette({ tokens, columns = 4 }: ColorsPaletteProps) {
  return (
    <div
      className="mb-8 grid gap-3"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {tokens.map((token) => (
        <ColorSwatch key={token} token={token} />
      ))}
    </div>
  );
}
