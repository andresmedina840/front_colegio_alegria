"use client";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import React from "react";

type CustomDatePickerProps = {
  label: string;
  value: string | null;
  onChange: (value: string | null) => void;
  maxDate?: string;
  error?: boolean;
  helperText?: string;
};

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  label,
  value,
  onChange,
  maxDate,
  error,
  helperText,
}) => {
  return (
    <DatePicker
      label={label}
      value={value ? dayjs(value) : null}
      onChange={(newValue) => onChange(newValue?.format("YYYY-MM-DD") || null)}
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