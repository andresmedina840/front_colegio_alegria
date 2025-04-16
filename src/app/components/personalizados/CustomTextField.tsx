'use client';

import { TextField, TextFieldProps } from "@mui/material";
import React, { useState, useEffect } from "react";

type CustomTextFieldProps = TextFieldProps & {
  uppercase?: boolean;
  onValueChange?: (value: string) => void;
  htmlInputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

/**
 * Componente CustomTextField mejorado con:
 * - Manejo eficiente de estado interno
 * - Soporte para transformación a mayúsculas
 * - Compatibilidad con las propiedades HTML estándar
 * - Optimización de rendimiento
 */
const CustomTextField = ({
  uppercase = false,
  onValueChange,
  onChange,
  value: propValue = "",
  htmlInputProps = {},
  slotProps = {},
  ...props
}: CustomTextFieldProps) => {
  // Estado interno para manejar el valor
  const [internalValue, setInternalValue] = useState(propValue);

  // Sincronización con el valor de las props
  useEffect(() => {
    setInternalValue(propValue);
  }, [propValue]);

  /**
   * Maneja el cambio en el input
   * @param e - Evento de cambio del input
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    // Transformar a mayúsculas si está habilitado
    if (uppercase) newValue = newValue.toUpperCase();

    // Actualizar estado y llamar callbacks
    setInternalValue(newValue);
    onValueChange?.(newValue);
    onChange?.({
      ...e,
      target: { ...e.target, value: newValue },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  // Estilo para transformación de texto
  const textTransformStyle = uppercase ? { textTransform: 'uppercase' as const } : {};

  return (
    <TextField
      {...props}
      value={internalValue}
      onChange={handleChange}
      variant="outlined"
      fullWidth
      slotProps={{
        ...slotProps,
        input: {
          ...slotProps.input,
          // Propiedades específicas del slot input de MUI
        },
        htmlInput: {
          ...htmlInputProps,
          spellCheck: false, // Deshabilita el corrector ortográfico
          "data-ms-editor": "false", // Evita el editor de MS
          style: {
            ...htmlInputProps.style,
            ...textTransformStyle, // Aplica transformación de texto
          },
        },
      }}
    />
  );
};

export default React.memo(CustomTextField);