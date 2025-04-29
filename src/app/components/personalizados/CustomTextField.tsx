// src/app/components/personalizados/CustomTextField.tsx
"use client";

import TextField, { TextFieldProps } from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
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

        const currentLength = String(value ?? "").length;

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
            error={!!error}
            helperText={error?.message || helperText}
            InputProps={{
              ...props.InputProps,
              endAdornment: showCharCount && maxLength ? (
                <InputAdornment position="end" sx={{ fontSize: "0.75rem", color: "text.secondary", mr: 0.5 }}>
                  {`${currentLength}/${maxLength}`}
                </InputAdornment>
              ) : (
                props.InputProps?.endAdornment || null
              ),
              inputProps: {
                ...(props.InputProps?.inputProps || {}),
                maxLength,
                spellCheck: false,
                "data-ms-editor": "false",
                style: {
                  ...(uppercase ? { textTransform: "uppercase" } : {}),
                  ...(props.InputProps?.inputProps?.style || {}),
                },
              },
            }}
            slotProps={{
              inputLabel: {
                shrink: true,
                ...props.slotProps?.inputLabel,
              },
              ...props.slotProps,
            }}
          />
        );
      }}
    />
  );
}

export default CustomTextField;
