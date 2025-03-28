import { Grid, Typography } from "@mui/material";
import React from "react";
import CustomTextField from "../components/personalizados/CustomTextField";

type EmergencyContactFormProps = {
  formData: Record<string, string>;
  handleChange: (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => void;
};

const EmergencyContactForm: React.FC<EmergencyContactFormProps> = ({
  formData,
  handleChange,
}) => {
  return (
    <>
      <Typography variant="h5" align="left" sx={{ fontWeight: "bold", mb: 3 }}>
        Contacto de Emergencia
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            label="Primer Nombre"
            name="primerNombreEmergencia"
            value={formData.primerNombreEmergencia || ""}
            onChange={handleChange}
            helperText={`${(formData.primerNombreEmergencia || "").length} / 26 caracteres`}
            inputProps={{ maxLength: 26 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            label="Segundo Nombre"
            name="segundoNombreEmergencia"
            value={formData.segundoNombreEmergencia || ""}
            onChange={handleChange}
            helperText={`${(formData.segundoNombreEmergencia || "").length} / 26 caracteres`}
            inputProps={{ maxLength: 26 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            label="Primer Apellido"
            name="primerApellidoEmergencia"
            value={formData.primerApellidoEmergencia || ""}
            onChange={handleChange}
            helperText={`${(formData.primerApellidoEmergencia || "").length} / 26 caracteres`}
            inputProps={{ maxLength: 26 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            label="Segundo Apellido"
            name="segundoApellidoEmergencia"
            value={formData.segundoApellidoEmergencia || ""}
            onChange={handleChange}
            helperText={`${(formData.segundoApellidoEmergencia || "").length} / 26 caracteres`}
            inputProps={{ maxLength: 26 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            label="Teléfono"
            name="telefonoEmergencia"
            value={formData.telefonoEmergencia || ""}
            onChange={handleChange}
            inputProps={{ maxLength: 15 }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomTextField
            fullWidth
            label="Parentesco"
            name="parentescoEmergencia"
            value={formData.parentescoEmergencia || ""}
            onChange={handleChange}
            inputProps={{ maxLength: 30 }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default EmergencyContactForm;