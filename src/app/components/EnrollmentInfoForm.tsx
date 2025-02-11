import { Card, CardContent, Grid, TextField } from "@mui/material";
import React from "react";

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
  return (
    <Card sx={{ p: 2, mb: 3, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="MATRICULA No."
              name="numeroMatricula"
              variant="outlined"
              value={formData.numeroMatricula || ""}
              onChange={handleChange}
              helperText={`${
                (formData.primerNombre || "").length
              } / 26 caracteres`}
              slotProps={{
                htmlInput: {
                  maxLength: 26,
                },
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="date"
              fullWidth
              label="Fecha de matrícula"
              name="fechaMatricula"
              value={formData.fechaMatricula || ""}
              onChange={handleChange}
              slotProps={{
                inputLabel: { shrink: true },
                htmlInput: { max: new Date().toISOString().split("T")[0] }, // Evitar fechas futuras
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default EnrollmentInfoForm;
