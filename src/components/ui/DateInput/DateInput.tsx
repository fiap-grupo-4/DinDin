"use client";

import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { useEffect, useRef } from "react";
import "react-day-picker/dist/style.css";

import { Input } from "../Input";
import { maskUtils, validationUtils } from "@/src/lib/utils";

export interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function DateInput({ value, onChange }: DateInputProps) {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = maskUtils.applyDateMask(e.target.value);
    onChange(masked);
  };

  return (
    <div ref={ref} className="relative w-full">
      <div onClick={() => setOpen(!open)}>
        <Input
          label="Data"
          value={value}
          placeholder="Selecione uma data"
          iconRight="CalendarLine"
          onChange={(e) => handleChange(e)}
        />
      </div>
      {open && (
        <div className="absolute z-10 mt-2 bg-white border-2 border-gray-400 p-3 rounded-md text-gray-800 shadow">
          <DayPicker
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
