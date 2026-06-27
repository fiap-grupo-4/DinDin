"use client";

import { useState, type CSSProperties } from "react";
import { DayPicker } from "react-day-picker";
import { ptBR } from "react-day-picker/locale";
import { useEffect, useRef } from "react";
import "react-day-picker/dist/style.css";
import "./date-picker.css";

import { Input } from "../Input";
import { validationUtils } from "./validation";
import { InputProps } from "../Input/Input";

export interface DateInputProps extends Omit<InputProps, "value" | "onChange"> {
  value: string;
  onChange: (value: string) => void;
}

export function DateInput({ value, onChange, ...inputProps }: DateInputProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>();

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

  useEffect(() => {
    const validateDate = (date: string) => {
      if (!date) {
        setDate(undefined);
        return;
      }

      const parts = date.split("/");

      if (parts.length !== 3) {
        setDate(undefined);
        return;
      }

      const [day, month, year] = parts.map(Number);

      if (
        year.toString().length === 4 &&
        validationUtils.isValidDate(day, month, year)
      ) {
        setDate(new Date(year, month - 1, day));
      } else {
        setDate(undefined);
      }
    };

    validateDate(value);
  }, [value]);

  return (
    <div ref={ref} className="relative w-full">
      <div onClick={() => setOpen(!open)}>
        <Input
          label="Data"
          value={value}
          placeholder="Selecione uma data"
          iconRight="CalendarLine"
          readOnly
          {...inputProps}
        />
      </div>
      {open && (
        <div className="absolute z-10 mt-2 rounded-md border-2 border-gray-400 bg-white p-3 text-gray-800 shadow">
          <DayPicker
            className="dindin-date-picker"
            locale={ptBR}
            style={
              {
                "--rdp-accent-color": "var(--brand-600)",
                "--rdp-accent-background-color": "var(--brand-100)",
                "--rdp-today-color": "var(--brand-600)",
              } as CSSProperties
            }
            mode="single"
            selected={date}
            onSelect={(selected) => {
              setDate(selected);
              onChange(selected ? selected.toLocaleDateString("pt-BR") : "");
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
}
