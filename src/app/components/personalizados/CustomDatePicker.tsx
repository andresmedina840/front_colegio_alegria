// CustomDatePicker.tsx (Versión actualizada)
"use client";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import React from "react";

type CustomDatePickerProps = {
  label: string;
  value: string | null;
  onChange: (value: string | null, name: string) => void; // Modificado para incluir nombre
  name: string; // Nuevo prop
  maxDate?: string;
  error?: boolean;
  helperText?: string;
};

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  value,
  onChange,
  name,
  maxDate,
  error,
  helperText,
}) => {
  const handleDateChange = (date: Dayjs | null) => {
    const formattedDate = date?.format("YYYY-MM-DD") || null;
    onChange(formattedDate, name); // Pasamos el nombre del campo
  };

  return (
    <DatePicker
      label={label}
      value={value ? dayjs(value) : null}
      onChange={handleDateChange}
      maxDate={maxDate ? dayjs(maxDate) : undefined}
      slotProps={{
        textField: {
          fullWidth: true,
          error,
          helperText,
          InputLabelProps: { shrink: true },
        },
      }}
      format="DD/MM/YYYY"
    />
  );
};

export default CustomDatePicker;