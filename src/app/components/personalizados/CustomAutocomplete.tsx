"use client";

import {
  Autocomplete,
  AutocompleteProps,
  TextField,
  TextFieldProps,
} from "@mui/material";
import {
  Controller,
  useFormContext,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import React from "react";

type CustomAutocompleteProps<
  T extends FieldValues,
  OptionType
> = {
  name: Path<T>;
  label: string;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
  options: OptionType[];
  getOptionLabel: (option: OptionType) => string;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  value?: OptionType | null;
  onChange: (
    event: React.SyntheticEvent<Element, Event>,
    value: OptionType | null
  ) => void;
} & Omit<
  AutocompleteProps<OptionType, false, false, false>,
  "renderInput" | "name" | "value" | "onChange" | "options"
> &
  Omit<TextFieldProps, "name" | "value" | "onChange">;

function CustomAutocomplete<T extends FieldValues, OptionType>({
  name,
  label,
  required = false,
  disabled = false,
  helperText,
  options,
  getOptionLabel,
  rules,
  value,
  onChange,
  ...props
}: CustomAutocompleteProps<T, OptionType>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ fieldState: { error } }) => (
        <Autocomplete
          {...props}
          options={options}
          getOptionLabel={getOptionLabel}
          value={value}
          onChange={onChange}
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
              error={error ? true : undefined}
              helperText={error?.message || helperText}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          )}
        />
      )}
    />
  );
}

export default CustomAutocomplete;
