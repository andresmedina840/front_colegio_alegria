"use client";

import { Card, CardContent, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTextField from "../components/CustomTextField";

type EnrollmentInfoFormProps = {
  formData: Record<string, string>;
  handleChange: (e: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
};

const EnrollmentInfoForm: React.FC<EnrollmentInfoFormProps> = ({ 
  formData, 
  handleChange 
}) => {
  const [maxDate, setMaxDate] = useState("");

  useEffect(() => {
    setMaxDate(new Date().toISOString().split("T")[0]);
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
                  spellCheck: false // 3. Desactivar corrección ortográfica
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            {/* 5. Eliminar renderizado condicional */}
            <CustomTextField
              type="date"
              label="Fecha de matrícula"
              name="fechaMatricula"
              value={formData.fechaMatricula || ""}
              onChange={handleChange}
              slotProps={{
                inputLabel: { shrink: true },
                htmlInput: { 
                  max: maxDate, 
                  spellCheck: false 
                },
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default EnrollmentInfoForm;