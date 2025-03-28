import { 
  Autocomplete, 
  TextField, 
  AutocompleteProps,
  AutocompleteChangeDetails,
  AutocompleteChangeReason
} from "@mui/material";
import { SyntheticEvent } from "react";

interface OptionType {
  id: string | number;
  nombre: string;
  [key: string]: unknown;
}

interface CustomAutocompleteProps<T = OptionType>
  extends Omit<
    AutocompleteProps<T, false, false, false>,
    "renderInput" | "options"
  > {
  label: string;
  name: string;
  options: T[];
  getOptionLabel: (option: T) => string;
  required?: boolean;
  onChangeSimple?: (value: T | null) => void; // Nueva prop opcional simplificada
}

const CustomAutocomplete = <T extends OptionType>({
  label,
  name,
  options,
  value,
  onChange,
  onChangeSimple, // Nueva prop
  getOptionLabel,
  required = false,
  disabled = false,
  ...props
}: CustomAutocompleteProps<T>) => {
  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    newValue: T | null,
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<T>
  ) => {
    // Si se proporcionó onChangeSimple, llamarlo con solo el valor
    if (onChangeSimple) {
      onChangeSimple(newValue);
    }
    // Llamar al onChange original de MUI si existe
    if (onChange) {
      onChange(event, newValue, reason, details);
    }
  };

  return (
    <Autocomplete<T, false, false, false>
      options={options}
      value={value}
      onChange={handleChange}
      getOptionLabel={getOptionLabel}
      isOptionEqualToValue={(option, val) => option?.id === val?.id}
      disabled={disabled}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          name={name}
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
      {...props}
    />
  );
};

export default CustomAutocomplete;