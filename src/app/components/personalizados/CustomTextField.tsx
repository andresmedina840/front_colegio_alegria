import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

type CustomTextFieldProps = TextFieldProps & {
  uppercase?: boolean;
};

const CustomTextField = ({ uppercase, InputProps, ...props }: CustomTextFieldProps) => {
  const textTransformStyle = uppercase
    ? { textTransform: "uppercase" as React.CSSProperties["textTransform"] }
    : undefined;

  return (
    <TextField
      {...props}
      variant="outlined"
      fullWidth
      slotProps={{
        input: {
          ...InputProps, // Se mueve de InputProps a slotProps.input
          style: textTransformStyle, // Mantiene el estilo
        },
        inputLabel: {
          shrink: true,
        },
        htmlInput: {
          spellCheck: false,
          "data-ms-editor": "false",
        },
      }}
    />
  );
};

export default CustomTextField;
