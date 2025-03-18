import {
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import CustomTextField from "./personalizados/CustomTextField";
import CustomAutocomplete from "./personalizados/CustomAutocomplete";

interface HealthAffiliationFormProps {
  formData: Record<string, string>;
  handleChange: (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => void;
  estratoEconomico: string[];
}

const HealthAffiliationForm: React.FC<HealthAffiliationFormProps> = ({
  formData,
  handleChange,
  estratoEconomico,
}) => {
  const [loadingEstratos, setLoadingEstratos] = useState(true);
  const [estratosOptions, setEstratosOptions] = useState<string[]>([]);

  useEffect(() => {
    setEstratosOptions(estratoEconomico);
    setLoadingEstratos(false);
  }, [estratoEconomico]);

  return (
    <Card sx={{ p: 2, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h5" align="left" sx={{ fontWeight: "bold", mb: 3 }}>
          Afiliación al sistema de salud
        </Typography>
        <Grid container spacing={2}>
          {[
            { label: "Tipo de Sangre y RH", name: "tipoSangre", maxLength: 5 },
            { label: "Eps Afiliado", name: "epsAfiliado", maxLength: 45 },
            { label: "IPS Asignada", name: "ipsAsignada", maxLength: 55 },
            { label: "ARS Afiliado", name: "arsAfiliado", maxLength: 55 },
            { label: "Nro Carnet SISBEN", name: "nroCarnetSisben", maxLength: 20 },
            { label: "Nivel de SISBEN", name: "nivelSisben", maxLength: 5 },
          ].map((field) => (
            <Grid item xs={12} sm={3} key={field.name}>
              <CustomTextField
                label={field.label}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                helperText={`${(formData[field.name] || "").length} / ${field.maxLength} caracteres`}
                inputProps={{ maxLength: field.maxLength }}
                uppercase
              />
            </Grid>
          ))}

          <Grid item xs={12} sm={3}>
            <CustomAutocomplete
              options={estratosOptions}
              value={formData.estrato || ""}
              onChange={(newValue) => {
                handleChange({
                  target: { name: "estrato", value: newValue || "" },
                } as React.ChangeEvent<{ name?: string; value: unknown }>);
              }}
              label="Estrato económico"
              required
              getOptionLabel={(option) => option}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default HealthAffiliationForm;
