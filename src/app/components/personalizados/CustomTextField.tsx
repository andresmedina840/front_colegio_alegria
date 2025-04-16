// src/app/components/personalizados/CustomTextField.tsx
'use client';

import { TextField, TextFieldProps } from "@mui/material";
import React, { memo, useCallback } from "react";
import { FormField } from "../../types/formTypes";

interface CustomTextFieldProps extends Omit<TextFieldProps, 'onChange' | 'slotProps'> {
  uppercase?: boolean;
  showCharCount?: boolean;
  maxLength?: number;
  updateField?: (field: FormField, value: string) => void;
  name?: FormField;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomTextField = memo(function CustomTextField({
  uppercase = false,
  showCharCount = false,
  maxLength,
  updateField,
  name,
  value,
  onChange,
  helperText,
  ...props
}: CustomTextFieldProps) {
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    if (maxLength && newValue.length > maxLength) {
      newValue = newValue.slice(0, maxLength);
    }

    if (uppercase) newValue = newValue.toUpperCase();

    if (onChange) {
      onChange({
        ...e,
        target: { ...e.target, value: newValue },
      } as React.ChangeEvent<HTMLInputElement>);
    }

    if (name && updateField) {
      updateField(name, newValue);
    }
  }, [maxLength, uppercase, onChange, name, updateField]);

  const charCountText = showCharCount && maxLength
    ? `${String(value).length} / ${maxLength} caracteres`
    : helperText;

  // Configuración de slotProps con tipado correcto
  const slotProps: TextFieldProps['slotProps'] = {
    inputLabel: {
      shrink: true,
      style: { pointerEvents: 'auto' } as React.CSSProperties
    },
    htmlInput: {
      maxLength,
      spellCheck: false,
      "data-ms-editor": "false",
      style: uppercase ? { textTransform: "uppercase" } : {},
    }
  };

  return (
    <TextField
      {...props}
      name={name}
      value={value || ""}
      onChange={handleChange}
      variant="outlined"
      fullWidth
      helperText={charCountText}
      slotProps={slotProps}
    />
  );
});

export default CustomTextField;