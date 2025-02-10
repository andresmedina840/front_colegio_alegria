import {
  Card,
  CardContent,
  Grid,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import React from "react";

type DiscapacidadesProps = {
  formData: Record<string, string>;
  handleChange: (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => void;
  siNo: string[];
};

const Discapacidades: React.FC<DiscapacidadesProps> = ({
  formData,
  handleChange,
  siNo,
}) => {
  // Determinar si debemos deshabilitar los demás campos
  const disableOtrosCampos = formData.discapacidadesNoAplica === "NO";
  return (
    <Card sx={{ p: 2, mb: 3, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography
          variant="h6"
          align="left"
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          Discapacidades
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <TextField
              select
              fullWidth
              label="No aplica"
              name="discapacidadesNoAplica"
              value={formData.discapacidadesNoAplica || ""}
              onChange={handleChange}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            >
              {siNo.map((respuestas) => (
                <MenuItem key={respuestas} value={respuestas}>
                  {respuestas}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              select
              fullWidth
              label="Sordera profunda"
              name="discapacidadesSorderaProfunda"
              value={formData.discapacidadesSorderaProfunda || ""}
              onChange={handleChange}
              disabled={disableOtrosCampos}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            >
              {siNo.map((respuestas) => (
                <MenuItem key={respuestas} value={respuestas}>
                  {respuestas}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              select
              fullWidth
              label="Hipoacusia o baja visión"
              name="discapacidadesHipoacusiaBajaVision"
              value={formData.discapacidadesHipoacusiaBajaVision || ""}
              onChange={handleChange}
              disabled={disableOtrosCampos}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            >
              {siNo.map((respuestas) => (
                <MenuItem key={respuestas} value={respuestas}>
                  {respuestas}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              select
              fullWidth
              label="Baja visión diagnosticada"
              name="discapacidadesBajaVisionDiagnosticada"
              value={formData.discapacidadesBajaVisionDiagnosticada || ""}
              onChange={handleChange}
              disabled={disableOtrosCampos}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            >
              {siNo.map((respuestas) => (
                <MenuItem key={respuestas} value={respuestas}>
                  {respuestas}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              select
              fullWidth
              label="Parálisis cerebral"
              name="discapacidadesParalisisCerebral"
              value={formData.discapacidadesParalisisCerebral || ""}
              onChange={handleChange}
              disabled={disableOtrosCampos}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            >
              {siNo.map((respuestas) => (
                <MenuItem key={respuestas} value={respuestas}>
                  {respuestas}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              select
              fullWidth
              label="Autismo"
              name="discapacidadesAutismo"
              value={formData.discapacidadesAutismo || ""}
              onChange={handleChange}
              disabled={disableOtrosCampos}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            >
              {siNo.map((respuestas) => (
                <MenuItem key={respuestas} value={respuestas}>
                  {respuestas}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              select
              fullWidth
              label="Deficiencia cognitiva"
              name="discapacidadesDeficienciaCognitiva"
              value={formData.discapacidadesDeficienciaCognitiva || ""}
              onChange={handleChange}
              disabled={disableOtrosCampos}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            >
              {siNo.map((respuestas) => (
                <MenuItem key={respuestas} value={respuestas}>
                  {respuestas}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              select
              fullWidth
              label="Sindrome de Down"
              name="discapacidadesSinromeDown"
              value={formData.discapacidadesSinromeDown || ""}
              onChange={handleChange}
              disabled={disableOtrosCampos}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            >
              {siNo.map((respuestas) => (
                <MenuItem key={respuestas} value={respuestas}>
                  {respuestas}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Discapacidades;
