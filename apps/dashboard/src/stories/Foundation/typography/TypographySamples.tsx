"use client";

import { TYPOGRAPHY_SAMPLE_ROWS } from "./typographyVariableNames";

export function TypographySamples() {
  return (
    <div
      className="flex flex-col gap-3"
      style={{ fontFamily: "var(--font-lato)" }}
    >
      {TYPOGRAPHY_SAMPLE_ROWS.map(
        ({ label, fontSize, lineHeight }) => (
          <p
            key={label}
            style={{
              fontFamily: "var(--font-lato)",
              fontSize: `var(${fontSize})`,
              lineHeight: `var(${lineHeight})`,
              margin: 0,
              color: "var(--gray-800)",
            }}
          >
            {label} — The quick brown fox jumps over the lazy dog.
          </p>
        ),
      )}
    </div>
  );
}
