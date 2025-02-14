import {
  Card,
  CardContent,
  Grid,
  Autocomplete,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import CustomTextField from "./personalizados/CustomTextField";
import CustomAutocomplete from "./personalizados/CustomAutocomplete";

type HealthAffiliationFormProps = {
  formData: Record<string, string>;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  estratoEconomico: string[];
};

const HealthAffiliationForm: React.FC<HealthAffiliationFormProps> = ({
  formData,
  handleChange,
  estratoEconomico,
}) => {
  const [loadingEstratos, setLoadingEstratos] = useState(true);
  const [estratosOptions, setEstratosOptions] = useState<string[]>([]);

  useEffect(() => {
    // Simular carga de datos
    setEstratosOptions(estratoEconomico);
    setLoadingEstratos(false);
  }, [estratoEconomico]);

  return (
    <Card sx={{ p: 2, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography
          variant="h5"
          align="left"
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          Afiliación al sistema de salud
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              label="Tipo de Sangre y RH"
              name="tipoSangre"
              value={formData.tipoSangre || ""}
              onChange={handleChange}
              helperText={`${
                (formData.tipoSangre || "").length
              } / 5 caracteres`}
              inputProps={{ maxLength: 5 }}
              uppercase
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              label="Eps Afiliado"
              name="epsAfiliado"
              value={formData.epsAfiliado || ""}
              onChange={handleChange}
              helperText={`${
                (formData.epsAfiliado || "").length
              } / 45 caracteres`}
              inputProps={{ maxLength: 45 }}
              uppercase
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              label="IPS Asignada"
              name="ipsAsignada"
              value={formData.ipsAsignada || ""}
              onChange={handleChange}
              helperText={`${
                (formData.ipsAsignada || "").length
              } / 55 caracteres`}
              inputProps={{ maxLength: 55 }}
              uppercase
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              label="ARS Afiliado"
              name="arsAfiliado"
              value={formData.arsAfiliado || ""}
              onChange={handleChange}
              helperText={`${
                (formData.arsAfiliado || "").length
              } / 55 caracteres`}
              inputProps={{ maxLength: 55 }}
              uppercase
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              label="Nro Carnet SISBEN"
              name="nroCarnetSisben"
              value={formData.nroCarnetSisben || ""}
              onChange={handleChange}
              helperText={`${
                (formData.nroCarnetSisben || "").length
              } / 20 caracteres`}
              inputProps={{ maxLength: 20 }}
              uppercase
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              label="Nivel de SISBEN"
              name="nivelSisben"
              value={formData.nivelSisben || ""}
              onChange={handleChange}
              helperText={`${
                (formData.nivelSisben || "").length
              } / 5 caracteres`}
              inputProps={{ maxLength: 5 }}
              uppercase
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomAutocomplete<string>
              options={estratosOptions}
              value={formData.estrato || null}
              onChange={(newValue) => {
                handleChange({
                  target: {
                    name: "estrato",
                    value: newValue || "",
                  },
                } as React.ChangeEvent<HTMLInputElement>);
              }}
              loading={loadingEstratos}
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
