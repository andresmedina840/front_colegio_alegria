import { Card, CardContent, Grid, TextField, MenuItem, Typography } from "@mui/material";
import React from "react";

type CapacidadesExcepcionalesProps = {
  formData: Record<string, string>;
  handleChange: (e: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
  siNo: string[];
};

const CapacidadesExcepcionales: React.FC<CapacidadesExcepcionalesProps> = ({
  formData,
  handleChange,
  siNo,
}) => {
  const disableOtrosCampos = formData.capacidadesExcepcionalesNoAplica === "NO"; // Nombre corregido

  return (
    <Card sx={{ p: 2, mb: 3, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" align="left" sx={{ fontWeight: "bold", mb: 3 }}>
          Capacidades excepcionales
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <TextField
              select
              fullWidth
              label="No aplica"
              name="capacidadesExcepcionalesNoAplica" // Nombre corregido
              value={formData.capacidadesExcepcionalesNoAplica || ""}
              onChange={handleChange}
              slotProps={{ inputLabel: { shrink: true } }}
            >
              {siNo.map((respuesta) => (
                <MenuItem key={respuesta} value={respuesta}>{respuesta}</MenuItem>
              ))}
            </TextField>
          </Grid>

          {[
            { label: "Superdotado", name: "capacidadesExcepcionalesSuperdotado" },
            { label: "Con talento cient", name: "capacidadesExcepcionalesTalentoCientifico" },
            { label: "Con talento tecno", name: "capacidadesExcepcionalesTalentoTecnologico" },
            { label: "Con talento subje", name: "capacidadesExcepcionalesTalentoSubjetivo" },
          ].map((item) => (
            <Grid item xs={12} sm={3} key={item.name}>
              <TextField
                select
                fullWidth
                label={item.label}
                name={item.name}
                value={formData[item.name] || ""}
                onChange={handleChange}
                disabled={disableOtrosCampos}
                slotProps={{ inputLabel: { shrink: true } }}
              >
                {siNo.map((respuesta) => (
                  <MenuItem key={respuesta} value={respuesta}>{respuesta}</MenuItem>
                ))}
              </TextField>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CapacidadesExcepcionales;