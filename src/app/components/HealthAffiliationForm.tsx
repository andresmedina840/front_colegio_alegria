import { Card, CardContent, Grid, MenuItem, TextField, Typography } from "@mui/material";
import React from "react";

type HealthAffiliationFormProps = {
  formData: Record<string, string>;
  handleChange: (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => void;
  estratoEconomico: string[];
};

const HealthAffiliationForm: React.FC<HealthAffiliationFormProps> = ({
  formData,
  handleChange,
  estratoEconomico,
}) => {
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
            <TextField
              fullWidth
              label="Tipo de Sangre y RH"
              name="tipoSangre"
              value={formData.tipoSangre || ""}
              onChange={handleChange}
              helperText={`${
                (formData.tipoSangre || "").length
              } / 5 caracteres`}
              slotProps={{
                htmlInput: {
                  maxLength: 5,
                },
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Eps Afiliado"
              name="epsAfiliado"
              value={formData.epsAfiliado || ""}
              onChange={handleChange}
              helperText={`${
                (formData.epsAfiliado || "").length
              } / 45 caracteres`}
              slotProps={{
                htmlInput: {
                  maxLength: 45,
                },
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="IPS Asignada"
              name="ipsAsignada"
              value={formData.ipsAsignada || ""}
              onChange={handleChange}
              helperText={`${
                (formData.epsAfiliado || "").length
              } / 55 caracteres`}
              slotProps={{
                htmlInput: {
                  maxLength: 55,
                },
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="ARS Afiliado"
              name="arsAfiliado"
              value={formData.arsAfiliado || ""}
              onChange={handleChange}
              helperText={`${
                (formData.epsAfiliado || "").length
              } / 55 caracteres`}
              slotProps={{
                htmlInput: {
                  maxLength: 55,
                },
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Nro Carnet SISBEN"
              name="nroCarnetSisben"
              value={formData.nroCarnetSisben || ""}
              onChange={handleChange}
              helperText={`${
                (formData.epsAfiliado || "").length
              } / 20 caracteres`}
              slotProps={{
                htmlInput: {
                  maxLength: 20,
                },
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Nivel de SISBEN"
              name="nivelSisben"
              value={formData.nivelSisben || ""}
              onChange={handleChange}
              helperText={`${
                (formData.epsAfiliado || "").length
              } / 5 caracteres`}
              slotProps={{
                htmlInput: {
                  maxLength: 5,
                },
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid>


          <Grid item xs={12} sm={4}>
            <TextField
              select
              fullWidth
              label="Estato económico"
              name="estrato"
              value={formData.estrato || ""}
              onChange={handleChange}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            >
              {estratoEconomico.map((respuestas) => (
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

export default HealthAffiliationForm;
