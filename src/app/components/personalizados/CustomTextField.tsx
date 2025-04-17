"use client";

import { TextField, TextFieldProps } from "@mui/material";
import React, { memo, useCallback } from "react";

export interface CustomTextFieldProps<TField extends string = string>
  extends Omit<TextFieldProps, "onChange"> {
  /**
   * Convierte el valor del input a mayúsculas automáticamente.
   */
  uppercase?: boolean;

  /**
   * Muestra contador de caracteres si `maxLength` está definido.
   */
  showCharCount?: boolean;

  /**
   * Limita el número máximo de caracteres.
   */
  maxLength?: number;

  /**
   * Método opcional para actualizar el campo desde el componente padre.
   */
  updateField?: (field: TField, value: string) => void;

  /**
   * Alternativa a `updateField`, útil si no se necesita `name`.
   */
  onValueChange?: (value: string) => void;

  /**
   * Nombre del campo (clave del objeto de estado en el padre).
   */
  name?: TField;

  /**
   * Valor del input.
   */
  value?: string;

  /**
   * Manejador de cambio (puede ser usado junto con `updateField`).
   */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function CustomTextFieldComponent<TField extends string = string>({
  uppercase = false,
  showCharCount = false,
  maxLength,
  updateField,
  onValueChange,
  name,
  value,
  onChange,
  helperText,
  slotProps: externalSlotProps = {},
  ...props
}: CustomTextFieldProps<TField>) {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value;

      if (maxLength && newValue.length > maxLength) {
        newValue = newValue.slice(0, maxLength);
      }

      if (uppercase) {
        newValue = newValue.toUpperCase();
      }

      if (onChange) {
        onChange({
          ...e,
          target: { ...e.target, value: newValue },
        } as React.ChangeEvent<HTMLInputElement>);
      }

      if (onValueChange) {
        onValueChange(newValue);
      }

      if (name && updateField) {
        updateField(name, newValue);
      }
    },
    [maxLength, uppercase, onChange, onValueChange, name, updateField]
  );

  const charCountText =
    showCharCount && maxLength
      ? `${String(value ?? "").length} / ${maxLength} caracteres`
      : helperText;

  const mergedSlotProps: TextFieldProps["slotProps"] = {
    ...externalSlotProps,
    inputLabel: {
      shrink: true,
      style: { pointerEvents: "auto" },
      ...externalSlotProps?.inputLabel,
    },
    htmlInput: {
      maxLength,
      spellCheck: false,
      "data-ms-editor": "false",
      style: uppercase ? { textTransform: "uppercase" } : {},
      ...externalSlotProps?.htmlInput,
    },
  };

  return (
    <TextField
      {...props}
      name={name}
      value={value ?? ""}
      onChange={handleChange}
      variant="outlined"
      fullWidth
      helperText={charCountText}
      slotProps={mergedSlotProps}
    />
  );
}

const CustomTextField = memo(CustomTextFieldComponent) as typeof CustomTextFieldComponent;

export default CustomTextField;
