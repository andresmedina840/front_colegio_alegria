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
      InputProps={{
        ...InputProps, // Se mantiene lo que venga de `props`
      }}
      slotProps={{
        inputLabel: {
          shrink: true,
        },
        htmlInput: {
          style: textTransformStyle,
          spellCheck: false,
          "data-ms-editor": "false",
        },
      }}
    />
  );
};

export default CustomTextField;
