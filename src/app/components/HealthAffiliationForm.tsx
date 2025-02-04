import { Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import React from "react";

type HealthAffiliationFormProps = {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const HealthAffiliationForm: React.FC<HealthAffiliationFormProps> = ({
  formData,
  handleChange,
}) => {
  return (
    <Card sx={{ p: 2, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h5" align="left" sx={{ fontWeight: "bold", mb: 3 }}>
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
              helperText={`${(formData.tipoSangre || "").length} / 5 caracteres`}
              inputProps={{ maxLength: 5 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Eps Afiliado"
              name="epsAfiliado"
              value={formData.epsAfiliado || ""}
              onChange={handleChange}
              helperText={`${(formData.epsAfiliado || "").length} / 45 caracteres`}
              inputProps={{ maxLength: 45 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="IPS Asignada"
              name="ipsAsignada"
              value={formData.ipsAsignada || ""}
              onChange={handleChange}
              helperText={`${(formData.ipsAsignada || "").length} / 55 caracteres`}
              inputProps={{ maxLength: 55 }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="ARS Afiliado"
              name="arsAfiliado"
              value={formData.arsAfiliado || ""}
              onChange={handleChange}
              helperText={`${(formData.arsAfiliado || "").length} / 45 caracteres`}
              inputProps={{ maxLength: 45 }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Nro Carnet SISBEN"
              name="nroCarnetSisben"
              value={formData.nroCarnetSisben || ""}
              onChange={handleChange}
              helperText={`${(formData.nroCarnetSisben || "").length} / 20 caracteres`}
              inputProps={{ maxLength: 20 }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Nivel de SISBEN"
              name="nivelSisben"
              value={formData.nivelSisben || ""}
              onChange={handleChange}
              helperText={`${(formData.nivelSisben || "").length} / 45 caracteres`}
              inputProps={{ maxLength: 45 }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Estrato"
              name="estrato"
              value={formData.estrato || ""}
              onChange={handleChange}
              helperText={`${(formData.estrato || "").length} / 3 caracteres`}
              inputProps={{ maxLength: 3 }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default HealthAffiliationForm;
