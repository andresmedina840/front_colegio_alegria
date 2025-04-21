// src/app/components/personalizados/CustomAutocomplete.tsx
"use client";

import { Controller, Control, FieldValues, Path, RegisterOptions } from "react-hook-form";
import { Autocomplete, TextField, AutocompleteProps } from "@mui/material";
import React from "react";

type CustomAutocompleteProps<T extends FieldValues, TOption> = {
  name: Path<T>;
  label: string;
  options: TOption[];
  control: Control<T>;
  getOptionLabel: (option: TOption) => string;
  onChange?: (event: React.SyntheticEvent, value: TOption | null) => void;
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
} & Omit<AutocompleteProps<TOption, false, false, false>, "renderInput" | "options" | "onChange">;

function CustomAutocomplete<T extends FieldValues, TOption>({
  name,
  label,
  options,
  control,
  getOptionLabel,
  onChange,
  disabled = false,
  required = false,
  helperText,
  rules,
  ...props
}: CustomAutocompleteProps<T, TOption>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange: onFieldChange, value, ref }, fieldState: { error } }) => (
        <Autocomplete
          {...props}
          options={options}
          getOptionLabel={getOptionLabel}
          onChange={(event, newValue) => {
            onFieldChange(newValue);
            onChange?.(event, newValue);
          }}
          value={value || null}
          disabled={disabled}
          isOptionEqualToValue={(option, value) => 
            getOptionLabel(option) === (value ? getOptionLabel(value) : '')
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              required={required}
              error={!!error}
              helperText={error?.message || helperText}
              inputRef={ref}
              InputLabelProps={{
                shrink: true,
              }}
            />
          )}
        />
      )}
    />
  );
}

export default CustomAutocomplete;