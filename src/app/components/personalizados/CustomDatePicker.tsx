// src/app/components/personalizados/CustomDatePicker.tsx
"use client";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import React from "react";
import { FormField } from "../../types/formTypes";

interface CustomDatePickerProps {
  label: string;
  name: FormField;
  value: string;
  onChange: (value: string | null, name: FormField) => void;
  maxDate?: string;
  minDate?: string;
  disabled?: boolean;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  name,
  value,
  onChange,
  maxDate,
  minDate,
  disabled = false,
}) => {
  const handleChange = (date: Dayjs | null) => {
    const formattedDate = date?.isValid() ? date.format("YYYY-MM-DD") : null;
    onChange(formattedDate, name);
  };

  return (
    <DatePicker
      label={label}
      value={value ? dayjs(value) : null}
      onChange={handleChange}
      maxDate={maxDate ? dayjs(maxDate) : undefined}
      minDate={minDate ? dayjs(minDate) : undefined}
      disabled={disabled}
      slotProps={{
        textField: {
          fullWidth: true,
          InputLabelProps: { shrink: true },
        },
      }}
      format="DD/MM/YYYY"
    />
  );
};

export default CustomDatePicker;