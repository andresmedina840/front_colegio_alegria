import { 
  Card, 
  CardContent, 
  Grid, 
  Typography 
} from "@mui/material";
import React from "react";
import CustomAutocomplete from "./personalizados/CustomAutocomplete";

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
            <CustomAutocomplete
              label="No aplica"
              name="discapacidadesNoAplica"
              options={siNo}
              value={formData.discapacidadesNoAplica || ""}
              onChange={(value) =>
                handleChange({
                  target: { name: "discapacidadesNoAplica", value: value ?? "" },
                } as React.ChangeEvent<HTMLInputElement>)
              }
              getOptionLabel={(option) => option}
            />
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
              <CustomAutocomplete
                label={item.label}
                name={item.name}
                options={siNo}
                value={formData[item.name] || ""}
                onChange={(value) =>
                  handleChange({
                    target: { name: item.name, value: value ?? "" },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
                getOptionLabel={(option) => option}
                disabled={disableOtrosCampos} // Desactiva si "No aplica = SI"
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Discapacidades;
