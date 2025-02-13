"use client";

import { Card, CardContent, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTextField from "./personalizados/CustomTextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

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
  const [maxDate, setMaxDate] = useState(dayjs().format("YYYY-MM-DD"));

  useEffect(() => {
    setMaxDate(dayjs().format("YYYY-MM-DD"));
  }, []);

  return (
    <Card sx={{ p: 2, mb: 3, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              label="No. Matricula"
              name="numeroMatricula"
              variant="outlined"
              value={formData.numeroMatricula || ""}
              onChange={handleChange}
              helperText={`${formData.numeroMatricula.length} / 26 caracteres`}
              slotProps={{
                htmlInput: {
                  maxLength: 26,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DatePicker
              label="Fecha de matrícula"
              value={
                formData.fechaMatricula &&
                dayjs(formData.fechaMatricula).isValid()
                  ? dayjs(formData.fechaMatricula)
                  : null
              }
              onChange={(newValue) => {
                console.log(
                  "Nueva fecha seleccionada en Fecha Matricula:",
                  newValue?.format("YYYY-MM-DD")
                );
                const event = {
                  target: {
                    name: "fechaMatricula",
                    value: newValue ? newValue.format("YYYY-MM-DD") : "",
                  },
                } as unknown as React.ChangeEvent<{
                  name?: string;
                  value: unknown;
                }>;
                handleChange(event);
              }}
              maxDate={dayjs(maxDate)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  InputLabelProps: {
                    shrink: true,
                  },
                },
              }}
              format="DD/MM/YYYY"
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default EnrollmentInfoForm;
