"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { useEffect, useRef } from "react";
import "react-day-picker/dist/style.css";

import { Input } from "../Input";

export function DateInput() {
  const [date, setDate] = useState<Date | undefined>();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      <div onClick={() => setOpen(!open)}>
        <Input
          label="Data"
          value={inputValue}
          placeholder="Selecione uma data"
          iconRight="CalendarLine"
          onChange={(e) => {
            const masked = applyDateMask(e.target.value);
            setInputValue(masked);

            const parts = masked.split("/");

            if (parts.length === 3) {
              const [day, month, year] = parts.map(Number);

              if (
                year.toString().length === 4 &&
                isValidDate(day, month, year)
              ) {
                setDate(new Date(year, month - 1, day));
              } else {
                setDate(undefined);
              }
            }
          }}
        />
      </div>
      {open && (
        <div className="absolute z-10 mt-2 bg-white border-2 border-gray-400 p-3 rounded-md text-gray-800 shadow">
          <DayPicker
            mode="single"
            selected={date}
            onSelect={(selected) => {
              setDate(selected);
              setInputValue(
                selected ? selected.toLocaleDateString("pt-BR") : ""
              );
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}

function applyDateMask(value: string) {
  const numbers = value.replace(/\D/g, "").slice(0, 8);

  if (numbers.length <= 2) return numbers;
  if (numbers.length <= 4)
    return `${numbers.slice(0, 2)}/${numbers.slice(2)}`;

  return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}/${numbers.slice(4)}`;
}

function isValidDate(day: number, month: number, year: number) {
  const date = new Date(year, month - 1, day);

  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}