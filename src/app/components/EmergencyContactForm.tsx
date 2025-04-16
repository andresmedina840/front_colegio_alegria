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
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField
            fullWidth
            label="Primer Nombre"
            name="primerNombreEmergencia"
            value={formData.primerNombreEmergencia || ""}
            onChange={handleChange}
            maxLength={26}
            showCharCount
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField
            fullWidth
            label="Segundo Nombre"
            name="segundoNombreEmergencia"
            value={formData.segundoNombreEmergencia || ""}
            onChange={handleChange}
            maxLength={26}
            showCharCount
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField
            fullWidth
            label="Primer Apellido"
            name="primerApellidoEmergencia"
            value={formData.primerApellidoEmergencia || ""}
            onChange={handleChange}
            maxLength={26}
            showCharCount
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField
            fullWidth
            label="Segundo Apellido"
            name="segundoApellidoEmergencia"
            value={formData.segundoApellidoEmergencia || ""}
            onChange={handleChange}
            maxLength={26}
            showCharCount
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField
            fullWidth
            label="Teléfono"
            name="telefonoEmergencia"
            value={formData.telefonoEmergencia || ""}
            maxLength={10}
            showCharCount
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField
            fullWidth
            label="Parentesco"
            name="parentescoEmergencia"
            value={formData.parentescoEmergencia || ""}
            maxLength={26}
            showCharCount
          />
        </Grid>
      </Grid>
    </>
  );
};

export default EmergencyContactForm;