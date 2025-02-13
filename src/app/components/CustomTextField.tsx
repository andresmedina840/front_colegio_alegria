// components/CustomTextField.tsx
import { TextField } from "@mui/material";
import React from "react";

type CustomTextFieldProps = {
  uppercase?: boolean;
  fullWidth?: boolean; // 👈 Nueva prop personalizada
  slotProps?: {
    htmlInput?: React.InputHTMLAttributes<HTMLInputElement> & {
      suppressHydrationWarning?: boolean;
    };
  };
} & React.ComponentProps<typeof TextField>;

const CustomTextField = (props: CustomTextFieldProps) => {
  // Establecer valores por defecto
  const { 
    uppercase, 
    fullWidth = true, // 👈 Valor por defecto: true
    slotProps = {}, 
    ...rest 
  } = props;

  const mergedSlotProps = {
    htmlInput: {
      suppressHydrationWarning: true,
      spellCheck: false,
      style: {
        textTransform: uppercase ? "uppercase" : "none",
        ...slotProps?.htmlInput?.style,
      },
      ...slotProps?.htmlInput,
    } as React.InputHTMLAttributes<HTMLInputElement>,
    inputLabel: {
      shrink: true,
      ...slotProps?.inputLabel,
    },
    ...slotProps,
  };

  return (
    <TextField 
      {...rest}
      fullWidth={fullWidth} // 👈 Aplica el valor (default true)
      slotProps={mergedSlotProps}
    />
  );
};

export default CustomTextField;