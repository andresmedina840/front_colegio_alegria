// src/app/components/EnrollmentInfoForm.tsx
"use client";

import { Card, CardContent, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTextField from "./personalizados/CustomTextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { getCurrentDateISO, formatDateToISO } from "../utils/dateUtils";
import { FormDataType, FormField } from "../types/formTypes";

type EnrollmentInfoFormProps = {
  formData: FormDataType;
  updateField: (field: FormField, value: string) => void;
};

const EnrollmentInfoForm: React.FC<EnrollmentInfoFormProps> = React.memo(
  ({ formData, updateField }) => {
    const [maxDate, setMaxDate] = useState("");
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setMaxDate(getCurrentDateISO());
      setIsMounted(true);
    }, []);

    const handleDateChange = (newValue: dayjs.Dayjs | null) => {
      updateField(
        "fechaMatricula",
        newValue ? formatDateToISO(newValue.toDate()) : ""
      );
    };

    const formattedDateValue =
      formData.fechaMatricula && dayjs(formData.fechaMatricula).isValid()
        ? dayjs(formData.fechaMatricula)
        : null;

    return (
      <Card sx={{ p: 2, mb: 3, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 2, md: 6 }}>
              <CustomTextField
                label="No. Matrícula"
                name="numeroMatricula"
                value={formData.numeroMatricula}
                updateField={updateField}
                uppercase
                maxLength={26}
                showCharCount
              />
            </Grid>

            {isMounted && (
              <Grid size={{ xs: 12, sm: 2, md: 6 }}>
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
                        "data-ms-editor": "false",
                      },
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
  }
);

export default EnrollmentInfoForm;
