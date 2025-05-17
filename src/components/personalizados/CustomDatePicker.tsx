"use client";

import { DatePicker } from "@mui/x-date-pickers";
import {
  Controller,
  Control,
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormTrigger,
} from "react-hook-form";
import CustomHelperText from "@/components/personalizados/CustomHelperText";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface Props<T extends FieldValues> {
  name: Path<T>;
  label: string;
  control: Control<T>;
  errors: FieldErrors<T>;
  rules?: RegisterOptions<T, Path<T>>;
  required?: boolean;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  trigger?: UseFormTrigger<T>;
  views?: ("year" | "month" | "day")[];
  disabled?: boolean;
  format?: string;
}

export const CustomDatePicker = <T extends FieldValues>({
  name,
  label,
  control,
  errors,
  rules,
  required = false,
  minDate,
  maxDate,
  trigger,
  views,
  disabled = false,
  format = "DD/MM/YYYY",
}: Props<T>) => {
  const parseDate = (dateValue: unknown): Dayjs | null => {
    if (!dateValue) return null;
    
    try {
      // Manejar formato ISO (backend) y DD/MM/YYYY (frontend)
      if (typeof dateValue === "string") {
        if (dateValue.includes("T") || dateValue.includes("-")) {
          return dayjs(dateValue);
        }
        return dayjs(dateValue, "DD/MM/YYYY", true);
      }
      return dayjs(dateValue as Dayjs);
    } catch {
      return null;
    }
  };

  const formatDateForStorage = (date: Dayjs | null): string | null => {
    if (!date?.isValid()) return null;
    return date.format("DD/MM/YYYY"); // Guardamos en formato DD/MM/YYYY
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        rules={{
          required: required ? "Campo requerido" : false,
          validate: {
            validDate: (value) => {
              if (!value) return true;
              const date = parseDate(value);
              return date?.isValid() || "Fecha inválida";
            },
            ...(rules?.validate || {}),
          },
          ...rules,
        }}
        render={({ field }) => {
          const value = parseDate(field.value);

          return (
            <DatePicker
              label={label}
              value={value}
              onChange={(newValue) => {
                const date = parseDate(newValue);
                field.onChange(formatDateForStorage(date));
                trigger?.(name);
              }}
              views={views}
              minDate={minDate}
              maxDate={maxDate}
              format={format}
              disabled={disabled}
              slotProps={{
                textField: {
                  fullWidth: true,
                  required,
                  error: !!errors[name],
                  helperText: errors[name]?.message ? (
                    <CustomHelperText>
                      {errors[name]?.message as string}
                    </CustomHelperText>
                  ) : undefined,
                  InputLabelProps: { shrink: true },
                },
              }}
            />
          );
        }}
      />
    </LocalizationProvider>
  );
};