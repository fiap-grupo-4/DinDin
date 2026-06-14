"use client";

import type { ReactNode } from "react";

import { CssVarValue } from "../lib/CssVarValue";
import {
  FONT_FAMILY_VAR,
  LINE_HEIGHT_VARS,
  TYPE_SCALE_VARS,
} from "./typographyVariableNames";

function Table({
  headers,
  children,
}: {
  headers: [string, string];
  children: ReactNode;
}) {
  return (
    <div className="my-4 w-full overflow-x-auto">
      <table
        className="w-full border-collapse border border-gray-300 text-left text-sm"
        style={{ fontFamily: "var(--font-lato)" }}
      >
        <thead>
          <tr className="bg-gray-300">
            <th className="border border-gray-400 px-3 py-2 font-semibold text-gray-800">
              {headers[0]}
            </th>
            <th className="border border-gray-400 px-3 py-2 font-semibold text-gray-800">
              {headers[1]}
            </th>
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

export function FontFamilyTable() {
  return (
    <Table headers={["Token", "Resolved value"]}>
      <tr className="bg-gray-200">
        <td className="border border-gray-400 px-3 py-2 text-gray-800">
          <code>{FONT_FAMILY_VAR}</code>
        </td>
        <td className="border border-gray-400 px-3 py-2 text-gray-700">
          <CssVarValue name={FONT_FAMILY_VAR} />
        </td>
      </tr>
    </Table>
  );
}

export function TypeScaleTable() {
  return (
    <Table headers={["Token", "Resolved value"]}>
      {TYPE_SCALE_VARS.map((token) => (
        <tr key={token} className="bg-gray-200">
          <td className="border border-gray-400 px-3 py-2 text-gray-800">
            <code>{token}</code>
          </td>
          <td className="border border-gray-400 px-3 py-2 text-gray-700">
            <CssVarValue name={token} />
          </td>
        </tr>
      ))}
    </Table>
  );
}

export function LineHeightTable() {
  return (
    <Table headers={["Token", "Resolved value"]}>
      {LINE_HEIGHT_VARS.map((token) => (
        <tr key={token} className="bg-gray-200">
          <td className="border border-gray-400 px-3 py-2 text-gray-800">
            <code>{token}</code>
          </td>
          <td className="border border-gray-400 px-3 py-2 text-gray-700">
            <CssVarValue name={token} />
          </td>
        </tr>
      ))}
    </Table>
  );
}
