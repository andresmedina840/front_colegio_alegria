// src/app/components/personalizados/CustomTextField.tsx
"use client";

import { TextField, TextFieldProps } from "@mui/material";
import {
  Controller,
  useFormContext,
  FieldValues,
  Path,
  RegisterOptions,
} from "react-hook-form";
import React from "react";

type CustomTextFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  maxLength?: number;
  uppercase?: boolean;
  showCharCount?: boolean;
} & Omit<TextFieldProps, "name" | "label" | "value" | "onChange" | "error" | "helperText">;

function CustomTextField<T extends FieldValues>({
  name,
  label,
  required = false,
  disabled = false,
  helperText,
  rules,
  maxLength,
  uppercase = false,
  showCharCount = false,
  ...props
}: CustomTextFieldProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          let newValue = e.target.value;

          if (maxLength && newValue.length > maxLength) {
            newValue = newValue.slice(0, maxLength);
          }

          if (uppercase) {
            newValue = newValue.toUpperCase();
          }

          onChange(newValue);
        };

        const charCountText =
          showCharCount && maxLength
            ? `${String(value ?? "").length} / ${maxLength} caracteres`
            : helperText;

        return (
          <TextField
            {...props}
            label={label}
            name={name}
            value={value ?? ""}
            onChange={handleChange}
            required={required}
            disabled={disabled}
            fullWidth
            variant="outlined"
            error={error ? true : undefined}
            helperText={error?.message || charCountText}
            inputProps={{
              ...props.inputProps,
              maxLength,
              style: uppercase ? { textTransform: "uppercase" } : undefined,
              spellCheck: false,
              "data-ms-editor": "false",
            }}
            InputLabelProps={{
              shrink: true,
              ...props.InputLabelProps,
            }}
          />
        );
      }}
    />
  );
}

export default CustomTextField;
