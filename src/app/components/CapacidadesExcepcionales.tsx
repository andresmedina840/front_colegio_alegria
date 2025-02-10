import {
  Card,
  CardContent,
  Grid,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import React from "react";

type CapacidadesExcepcionalesProps = {
  formData: Record<string, string>;
  handleChange: (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => void;
  siNo: string[];
};

const CapacidadesExcepcionales: React.FC<CapacidadesExcepcionalesProps> = ({
  formData,
  handleChange,
  siNo,
}) => {
  // Determinar si debemos deshabilitar los demás campos
  const disableOtrosCampos = formData.capacidadesExceptionalesNoAplica === "NO";
  return (
    <Card sx={{ p: 2, mb: 3, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography
          variant="h6"
          align="left"
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          Capacidades excepcionales
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <TextField
              select
              fullWidth
              label="No aplica"
              name="capacidadesExceptionalesNoAplica"
              value={formData.capacidadesExceptionalesNoAplica || ""}
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
              label="Superdotado"
              name="capacidadesExceptionalesSuperdotado"
              value={formData.capacidadesExceptionalesSuperdotado || ""}
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
              label="Con talento cient"
              name="capacidadesExceptionalesTalentoCientifico"
              value={formData.capacidadesExceptionalesTalentoCientifico || ""}
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
              label="Con talento tecno"
              name="capacidadesExceptionalesTalentoTecnologico"
              value={formData.capacidadesExceptionalesTalentoTecnologico || ""}
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
              label="Con talento subje"
              name="capacidadesExceptionalesTalentoSubjetivo"
              value={formData.capacidadesExceptionalesTalentoSubjetivo || ""}
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

export default CapacidadesExcepcionales;
