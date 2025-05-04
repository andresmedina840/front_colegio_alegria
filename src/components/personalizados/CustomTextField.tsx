// src/components/personalizados/CustomTextField.tsx
"use client";

import TextField, { TextFieldProps } from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import {
  Controller,
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  FieldError,
} from "react-hook-form";
import React from "react";

type CustomTextFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
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
  type?: string;
  InputProps?: TextFieldProps['InputProps'];
  slotProps?: TextFieldProps['slotProps'];
} & Omit<TextFieldProps, "name" | "label" | "value" | "onChange" | "error" | "helperText">;

function CustomTextField<T extends FieldValues>({
  name,
  label,
  control,
  required = false,
  disabled = false,
  helperText,
  rules,
  maxLength,
  uppercase = false,
  showCharCount = false,
  type = 'text',
  InputProps,
  slotProps,
  ...props
}: CustomTextFieldProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
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
            type={type}
            label={label}
            name={name}
            value={value ?? ""}
            onChange={handleChange}
            inputRef={ref}
            required={required}
            disabled={disabled}
            fullWidth
            variant="outlined"
            error={!!error}
            helperText={(error as FieldError)?.message || helperText}
            InputProps={{
              ...InputProps,
              endAdornment: showCharCount && maxLength ? (
                <InputAdornment position="end" sx={{ fontSize: "0.75rem", color: "text.secondary", mr: 0.5 }}>
                  {`${currentLength}/${maxLength}`}
                </InputAdornment>
              ) : (
                InputProps?.endAdornment || null
              ),
              inputProps: {
                ...(InputProps?.inputProps || {}),
                maxLength,
                spellCheck: false,
                "data-ms-editor": "false",
                style: {
                  ...(uppercase ? { textTransform: "uppercase" } : {}),
                  ...(InputProps?.inputProps?.style || {}),
                },
              },
            }}
            slotProps={{
              inputLabel: {
                shrink: true,
                ...slotProps?.inputLabel,
              },
              ...slotProps,
            }}
          />
        );
      }}
    />
  );
}

export default CustomTextField;