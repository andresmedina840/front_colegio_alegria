// src/components/EnrollmentInfoForm.tsx
"use client";

import { Card, CardContent, Grid } from "@mui/material";
import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { Control, FieldErrors, UseFormTrigger } from "react-hook-form";
import CustomTextField from "./personalizados/CustomTextField";
import { getCurrentDateISO } from "../utils/dateUtils";
import { StudentInfoFormValues } from "@/schemas/studentInfoSchema";
import { CustomDatePicker } from "./personalizados/CustomDatePicker";
import dayjs from "dayjs";

type Props = {
  control: Control<StudentInfoFormValues>;
  errors: FieldErrors<StudentInfoFormValues>;
  trigger: UseFormTrigger<StudentInfoFormValues>;
};

const EnrollmentInfoForm = ({ control, errors, trigger }: Props) => {
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

          <Grid size={{ xs: 12, sm: 6 }}>
            <CustomDatePicker
              name="fechaMatricula"
              label="Fecha de matrícula"
              control={control}
              errors={errors}
              required
              maxDate={maxDate || undefined}
              trigger={trigger}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default EnrollmentInfoForm;
