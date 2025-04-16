"use client";

import { Card, CardContent, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTextField from "./personalizados/CustomTextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { getCurrentDateISO, formatDateToISO } from "../utils/dateUtils";

type EnrollmentInfoFormProps = {
  formData: Record<string, string>;
  handleChange: (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => void;
};

const EnrollmentInfoForm: React.FC<EnrollmentInfoFormProps> = ({
  formData,
  handleChange,
}) => {
  const [maxDate, setMaxDate] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setMaxDate(getCurrentDateISO());
    setIsMounted(true);
  }, []);

  const handleDateChange = (newValue: dayjs.Dayjs | null) => {
    const event = {
      target: {
        name: "fechaMatricula",
        value: newValue ? formatDateToISO(newValue.toDate()) : "",
      },
    } as unknown as React.ChangeEvent<{ name?: string; value: unknown }>;
    
    handleChange(event);
  };

  const formattedDateValue = formData.fechaMatricula && dayjs(formData.fechaMatricula).isValid()
    ? dayjs(formData.fechaMatricula)
    : null;

  return (
    <Card sx={{ p: 2, mb: 3, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField
              label="No. Matricula"
              name="numeroMatricula"
              uppercase
              variant="outlined"
              value={formData.numeroMatricula || ""}
              onChange={handleChange}
              helperText={`${(formData.numeroMatricula || "").length} / 26 caracteres`}
              slotProps={{
                htmlInput: {
                  maxLength: 26,
                  suppressHydrationWarning: true,
                  spellCheck: false,
                  "data-ms-editor": "false"
                },
              }}
            />
          </Grid>
          
          {isMounted && (
            <Grid size={{ xs: 12, md: 6 }}>
              <DatePicker
                label="Fecha de matrícula"
                value={formattedDateValue}
                onChange={handleDateChange}
                maxDate={dayjs(maxDate)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    InputLabelProps: { shrink: true },
                    inputProps: {
                      suppressHydrationWarning: true,
                      spellCheck: false,
                      "data-ms-editor": "false"
                    } as React.InputHTMLAttributes<HTMLInputElement>,
                  },
                }}
                format="DD/MM/YYYY"
                timezone="UTC"
              />
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default EnrollmentInfoForm;