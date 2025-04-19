// src/app/components/personalizados/CustomDatePicker.tsx
"use client";

import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import {
  Controller,
  useFormContext,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import dayjs, { Dayjs } from "dayjs";
import React from "react";

type CustomDatePickerProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  minDate?: string | Dayjs;
  maxDate?: string | Dayjs;
} & Omit<DatePickerProps<Dayjs>, "value" | "onChange" | "renderInput">;

function CustomDatePicker<T extends FieldValues>({
  name,
  label,
  required = false,
  disabled = false,
  helperText,
  rules,
  minDate,
  maxDate,
  ...props
}: CustomDatePickerProps<T>) {
  const { control } = useFormContext<T>();

  const parseDate = (date?: string | Dayjs) =>
    typeof date === "string" ? dayjs(date) : date;

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <DatePicker
          value={value ? dayjs(value) : null}
          onChange={(newValue) => {
            const formattedDate = newValue?.isValid()
              ? newValue.format("YYYY-MM-DD")
              : "";
            onChange(formattedDate);
          }}
          format="DD/MM/YYYY"
          disabled={disabled}
          minDate={parseDate(minDate)}
          maxDate={parseDate(maxDate)}
          slotProps={{
            textField: {
              label,
              required,
              name,
              error: !!error,
              helperText: error?.message || helperText,
              fullWidth: true,
              variant: "outlined",
              InputLabelProps: { shrink: true },
            },
          }}
          {...props}
        />
      )}
    />
  );
}

export default CustomDatePicker;
