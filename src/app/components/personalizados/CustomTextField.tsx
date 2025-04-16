'use client';

import { TextField, TextFieldProps } from "@mui/material";
import React, { useState, useEffect } from "react";

type CustomTextFieldProps = TextFieldProps & {
  uppercase?: boolean;
  onValueChange?: (value: string) => void;
  showCharCount?: boolean;
  maxLength?: number;
  htmlInputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const CustomTextField = ({
  uppercase = false,
  onValueChange,
  onChange,
  value: propValue = "",
  showCharCount = false,
  maxLength,
  htmlInputProps = {},
  slotProps = {},
  ...props
}: CustomTextFieldProps) => {
  const [internalValue, setInternalValue] = useState<string>(String(propValue || ""));
  const [displayValue, setDisplayValue] = useState<string>(String(propValue || ""));

  useEffect(() => {
    const stringValue = String(propValue || "");
    setInternalValue(stringValue);
    setDisplayValue(stringValue);
  }, [propValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    
    // Aplicar límite de caracteres
    const lengthLimit = maxLength || htmlInputProps.maxLength;
    if (lengthLimit && newValue.length > lengthLimit) {
      newValue = newValue.slice(0, lengthLimit);
    }

    if (uppercase) newValue = newValue.toUpperCase();

    setInternalValue(newValue);
    setDisplayValue(newValue);
    onValueChange?.(newValue);
    onChange?.({
      ...e,
      target: { ...e.target, value: newValue },
    });
  };

  // Calcular helperText
  const charCountText = showCharCount && maxLength 
    ? `${displayValue.length} / ${maxLength} caracteres` 
    : props.helperText;

  return (
    <TextField
      {...props}
      value={displayValue}
      onChange={handleChange}
      variant="outlined"
      fullWidth
      helperText={charCountText}
      slotProps={{
        ...slotProps,
        inputLabel: {
          ...slotProps.inputLabel,
          shrink: true,
        },
        htmlInput: {
          ...htmlInputProps,
          maxLength, // Esto ahora funciona correctamente
          spellCheck: false,
          "data-ms-editor": "false",
          style: {
            ...htmlInputProps.style,
            ...(uppercase ? { textTransform: 'uppercase' } : {}),
          },
        },
      }}
    />
  );
};

export default React.memo(CustomTextField);