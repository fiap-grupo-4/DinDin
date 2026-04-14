"use client";

import { CssVarValue } from "../lib/CssVarValue";
import { TYPE_SCALE_VARS } from "./typographyVariableNames";

export function TypographyScaleOverview() {
  return (
    <div
      className="flex flex-col gap-4 border border-gray-300 bg-gray-200 p-4"
      style={{ fontFamily: "var(--font-lato)" }}
    >
      {TYPE_SCALE_VARS.map((token) => (
        <div
          key={token}
          className="flex flex-col gap-1 border-b border-gray-300 pb-3 last:border-0 last:pb-0"
        >
          <div
            style={{
              fontSize: `var(${token})`,
              lineHeight: `var(${token.includes("body") ? "--leading-body" : "--leading-heading"})`,
              color: "var(--gray-800)",
            }}
          >
            DinDin — manage your money
          </div>
          <div className="flex flex-wrap gap-x-2 text-[0.75rem] text-gray-600">
            <code>{token}</code>
            <span aria-hidden="true">·</span>
            <CssVarValue name={token} />
          </div>
        </div>
      ))}
    </div>
  );
}
