"use client";

import {
  Controller,
  Control,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import { Autocomplete, TextField, AutocompleteProps } from "@mui/material";
import React from "react";

type CustomAutocompleteProps<
  T extends FieldValues,
  TOption extends object,
  TValue = string
> = {
  name: Path<T>;
  label: string;
  options: TOption[];
  control: Control<T>;
  getOptionLabel: (option: TOption) => string;
  getOptionValue?: (option: TOption) => TValue;
  onChange?: (event: React.SyntheticEvent, value: TOption | null) => void;
  disabled?: boolean;
  required?: boolean;
  helperText?: string;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  loading?: boolean;
} & Omit<
  AutocompleteProps<TOption, false, false, false>,
  "renderInput" | "options" | "onChange"
>;

function CustomAutocomplete<
  T extends FieldValues,
  TOption extends object,
  TValue = string
>({
  name,
  label,
  options,
  control,
  getOptionLabel,
  getOptionValue,
  onChange,
  disabled = false,
  required = false,
  helperText,
  rules,
  loading,
  ...props
}: CustomAutocompleteProps<T, TOption, TValue>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange: onFieldChange, value, ref },
        fieldState: { error },
      }) => {
        // Función para obtener el valor de comparación seguro para tipos
        const getSafeValue = (item: TOption | TValue | null): TValue | null => {
          if (!item) return null;
          if (typeof item === "object" && "id" in item) {
            return getOptionValue
              ? getOptionValue(item as TOption)
              : (getOptionLabel(item as TOption) as unknown as TValue);
          }
          return item as TValue;
        };

        // Encontrar la opción seleccionada de manera segura
        const findSelectedOption = (
          currentValue: TValue | null
        ): TOption | null => {
          if (currentValue === null) return null;
          return (
            options.find((option) => {
              const optionValue = getOptionValue
                ? getOptionValue(option)
                : (getOptionLabel(option) as unknown as TValue);
              return optionValue === currentValue;
            }) || null
          );
        };

        const currentValue = getSafeValue(value);
        const selectedOption = findSelectedOption(currentValue);

        return (
          <Autocomplete
            {...props}
            options={options}
            getOptionLabel={(option) => {
              const label = getOptionLabel(option);
              return label ?? "";
            }}
            onChange={(event, newValue) => {
              const valueToStore = newValue
                ? getOptionValue
                  ? getOptionValue(newValue)
                  : (getOptionLabel(newValue) as unknown as TValue)
                : null;
              onFieldChange(valueToStore);
              onChange?.(event, newValue);
            }}
            value={selectedOption}
            disabled={disabled}
            loading={loading}
            isOptionEqualToValue={(option, val) => {
              const optionValue = getOptionValue
                ? getOptionValue(option)
                : (getOptionLabel(option) as unknown as TValue);
              const valValue = getSafeValue(val);
              return optionValue === valValue;
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                required={required}
                error={!!error}
                helperText={error?.message || helperText}
                inputRef={ref}
                autoComplete="new-password"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          />
        );
      }}
    />
  );
}

export default CustomAutocomplete;
