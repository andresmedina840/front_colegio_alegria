// src/components/EnrollmentInfoForm.tsx
"use client";

import { Card, CardContent, Grid } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { Controller, Control } from "react-hook-form";
import CustomTextField from "./personalizados/CustomTextField";
import { getCurrentDateISO, formatDateToISO } from "../utils/dateUtils";
import { StudentInfoFormValues } from "@/schemas/studentInfoSchema";

type EnrollmentInfoFormProps = {
  control: Control<StudentInfoFormValues>;
};

const EnrollmentInfoForm = ({ control }: EnrollmentInfoFormProps) => {
  const [maxDate, setMaxDate] = useState<Dayjs | null>(null);

  useEffect(() => {
    setMaxDate(dayjs(getCurrentDateISO()));
  }, []);

  return (
    <Card sx={{ p: 2, mb: 3, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomTextField<StudentInfoFormValues>
              name="numeroMatricula"
              control={control}
              label="No. Matrícula"
              maxLength={26}
              showCharCount
            />
          </Grid>

          {maxDate && (
            <Grid size={{ xs: 12, sm: 6 }}>
              <Controller
                name="fechaMatricula"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    label="Fecha de matrícula"
                    value={value && dayjs(value).isValid() ? dayjs(value) : null}
                    onChange={(newValue) =>
                      onChange(newValue ? formatDateToISO(newValue.toDate()) : "")
                    }
                    maxDate={maxDate}
                    format="DD/MM/YYYY"
                    timezone="UTC"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        InputLabelProps: { shrink: true },
                        inputProps: {
                          suppressHydrationWarning: true,
                          spellCheck: false,
                          "data-ms-editor": "false",
                        } as React.InputHTMLAttributes<HTMLInputElement>,
                      },
                    }}
                  />
                )}
              />
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default EnrollmentInfoForm;
