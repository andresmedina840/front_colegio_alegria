import { 
  Card, 
  CardContent, 
  Grid, 
  TextField, 
  MenuItem, 
  Typography 
} from "@mui/material";
import React from "react";

interface DiscapacidadesProps {
  formData: Record<string, string>;
  handleChange: (e: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
  siNo: string[];
}

const Discapacidades: React.FC<DiscapacidadesProps> = ({
  formData,
  handleChange,
  siNo,
}) => {
  const disableOtrosCampos = formData.discapacidadesNoAplica === "NO"; 

  return (
    <Card sx={{ p: 2, mb: 3, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" align="left" sx={{ fontWeight: "bold", mb: 3 }}>
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
              slotProps={{ inputLabel: { shrink: true } }}
            >
              {siNo.map((respuesta) => (
                <MenuItem key={respuesta} value={respuesta}>{respuesta}</MenuItem>
              ))}
            </TextField>
          </Grid>

          {[
            { label: "Sordera profunda", name: "discapacidadesSorderaProfunda" },
            { label: "Hipoacusia o baja visión", name: "discapacidadesHipoacusiaBajaVision" },
            { label: "Baja visión diagnosticada", name: "discapacidadesBajaVisionDiagnosticada" },
            { label: "Parálisis cerebral", name: "discapacidadesParalisisCerebral" },
            { label: "Autismo", name: "discapacidadesAutismo" },
            { label: "Deficiencia cognitiva", name: "discapacidadesDeficienciaCognitiva" },
            { label: "Síndrome de Down", name: "discapacidadesSindromeDown" },
          ].map((item) => (
            <Grid item xs={12} sm={3} key={item.name}>
              <TextField
                select
                fullWidth
                label={item.label}
                name={item.name}
                value={formData[item.name] || ""}
                onChange={handleChange}
                disabled={disableOtrosCampos} // Desactiva si "No aplica = SI"
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

export default Discapacidades;