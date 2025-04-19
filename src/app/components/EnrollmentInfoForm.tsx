"use client";

import { Card, CardContent, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTextField from "./personalizados/CustomTextField";
import CustomDatePicker from "./personalizados/CustomDatePicker";
import { getCurrentDayjsUTC } from "../utils/dateUtils";
import { useFormContext } from "react-hook-form";
import { FormDataType } from "../types/formTypes";

const EnrollmentInfoFormComponent: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { formState: { errors } } = useFormContext<FormDataType>();
  const maxDate = getCurrentDayjsUTC();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Card sx={{ p: 2, mb: 3, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Grid container spacing={2}>
          {/*<Grid size={{ xs: 12, sm: 2, md: 6 }}>
            <CustomTextField
              name="numeroMatricula"
              label="No. Matrícula"
              maxLength={26}
              showCharCount
              uppercase
              helperText={errors.numeroMatricula?.message}
            />
          </Grid>*/}

          {isMounted && (
            <Grid size={{ xs: 12, sm: 2, md: 6 }}>
              <CustomDatePicker
                name="fechaMatricula"
                label="Fecha de matrícula"
                required
                maxDate={maxDate}
                helperText={errors.fechaMatricula?.message}
              />
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

EnrollmentInfoFormComponent.displayName = "EnrollmentInfoForm";

const EnrollmentInfoForm = React.memo(EnrollmentInfoFormComponent);

export default EnrollmentInfoForm;
