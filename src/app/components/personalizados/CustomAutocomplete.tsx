import { Autocomplete, TextField } from "@mui/material";
import React from "react";

type CustomAutocompleteProps = {
  label: string;
  options: any[];
  value: any;
  onChange: (value: any) => void;
  getOptionLabel: (option: any) => string;
  required?: boolean;
  disabled?: boolean;
};

const CustomAutocomplete = ({
  label,
  options,
  value,
  onChange,
  getOptionLabel,
  required = false,
  disabled = false,
}: CustomAutocompleteProps) => {
  return (
    <Autocomplete
      options={options}
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={(option, value) => option?.id === value?.id}
      disabled={disabled}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          required={required}
          variant="outlined"
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />
      )}
    />
  );
};

export default CustomAutocomplete;