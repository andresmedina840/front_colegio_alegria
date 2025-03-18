import { 
  Card, 
  CardContent, 
  Grid, 
  Typography 
} from "@mui/material";
import React from "react";
import CustomAutocomplete from "./personalizados/CustomAutocomplete";

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
  const disableOtrosCampos = formData.capacidadesExcepcionalesNoAplica === "NO";

  return (
    <Card sx={{ p: 2, mb: 3, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" align="left" sx={{ fontWeight: "bold", mb: 3 }}>
          Capacidades excepcionales
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <CustomAutocomplete
              label="No aplica"
              options={siNo}
              value={formData.capacidadesExcepcionalesNoAplica || ""}
              onChange={(value) =>
                handleChange({
                  target: { name: "capacidadesExcepcionalesNoAplica", value: value ?? "" },
                } as React.ChangeEvent<HTMLInputElement>)
              }
              getOptionLabel={(option) => option}
            />
          </Grid>

          {[
            { label: "Superdotado", name: "capacidadesExcepcionalesSuperdotado" },
            { label: "Con talento cient", name: "capacidadesExcepcionalesTalentoCientifico" },
            { label: "Con talento tecno", name: "capacidadesExcepcionalesTalentoTecnologico" },
            { label: "Con talento subje", name: "capacidadesExcepcionalesTalentoSubjetivo" },
          ].map((item) => (
            <Grid item xs={12} sm={3} key={item.name}>
              <CustomAutocomplete
                label={item.label}
                options={siNo}
                value={formData[item.name] || ""}
                onChange={(value) =>
                  handleChange({
                    target: { name: item.name, value: value ?? "" },
                  } as React.ChangeEvent<HTMLInputElement>)
                }
                getOptionLabel={(option) => option}
                disabled={disableOtrosCampos}
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CapacidadesExcepcionales;
