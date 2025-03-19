import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

type CustomTextFieldProps = TextFieldProps & {
  uppercase?: boolean;
};

const CustomTextField = ({ uppercase, onChange, ...props }: CustomTextFieldProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (uppercase) {
      e.target.value = e.target.value.toUpperCase();
    }
    onChange?.(e);
  };

  return (
    <TextField
      {...props}
      onChange={handleChange}
      variant="outlined"
      fullWidth
      inputProps={{
        ...props.inputProps,
        style: uppercase
          ? {
              textTransform: "uppercase",
              ...(props.inputProps?.style || {}),
            }
          : props.inputProps?.style,
      }}
      slotProps={{
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
