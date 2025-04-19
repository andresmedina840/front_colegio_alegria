// src/app/components/personalizados/ControlledAutocomplete.tsx
"use client";

import {
  Autocomplete,
  AutocompleteProps,
  TextField,
  TextFieldProps,
} from "@mui/material";
import React from "react";

type ControlledAutocompleteProps<OptionType> = {
  label: string;
  name: string;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
  options: OptionType[];
  value: OptionType | null;
  onChange: (
    event: React.SyntheticEvent<Element, Event>,
    value: OptionType | null
  ) => void;
  getOptionLabel: (option: OptionType) => string;
} & Omit<
  AutocompleteProps<OptionType, false, false, false>,
  "renderInput" | "name" | "value" | "onChange" | "options"
> &
  Omit<TextFieldProps, "name" | "value" | "onChange">;

function ControlledAutocomplete<OptionType>({
  label,
  name,
  required = false,
  disabled = false,
  helperText,
  options,
  value,
  onChange,
  getOptionLabel,
  ...props
}: ControlledAutocompleteProps<OptionType>) {
  return (
    <Autocomplete
      {...props}
      options={options}
      value={value}
      onChange={onChange}
      getOptionLabel={getOptionLabel}
      disabled={disabled}
      isOptionEqualToValue={(option, val) =>
        JSON.stringify(option) === JSON.stringify(val)
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          name={name}
          required={required}
          error={!!helperText}
          helperText={helperText}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
      )}
    />
  );
}

export default ControlledAutocomplete;
