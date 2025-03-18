import { Autocomplete, TextField } from "@mui/material";
import React from "react";

interface CustomAutocompleteProps<T> {
  label: string;
  options: T[];
  value: T | null;
  onChange: (value: T | null) => void;
  getOptionLabel: (option: T) => string;
  required?: boolean;
  disabled?: boolean;
  loading?: boolean;
}

const CustomAutocomplete = <T,> ({
  label,
  options,
  value,
  onChange,
  getOptionLabel,
  required = false,
  disabled = false,
  loading = false,
}: CustomAutocompleteProps<T>) => {
  return (
    <Autocomplete
      options={options}
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={(option, value) => JSON.stringify(option) === JSON.stringify(value)}
      disabled={disabled}
      loading={loading}
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
