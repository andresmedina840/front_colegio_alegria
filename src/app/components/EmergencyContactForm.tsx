"use client";

import { Grid, Typography } from "@mui/material";
import CustomTextField from "../components/personalizados/CustomTextField";

const EmergencyContactForm = () => {
  return (
    <>
      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 3 }}>
        Contacto de Emergencia
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 2, md: 6 }}>
          <CustomTextField
            label="Primer Nombre"
            name="primerNombreEmergencia"
            maxLength={26}
            showCharCount
            required
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 2, md: 6 }}>
          <CustomTextField
            label="Segundo Nombre"
            name="segundoNombreEmergencia"
            maxLength={26}
            showCharCount
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 2, md: 6 }}>
          <CustomTextField
            label="Primer Apellido"
            name="primerApellidoEmergencia"
            maxLength={26}
            showCharCount
            required
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 2, md: 6 }}>
          <CustomTextField
            label="Segundo Apellido"
            name="segundoApellidoEmergencia"
            maxLength={26}
            showCharCount
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 2, md: 6 }}>
          <CustomTextField
            label="Teléfono"
            name="telefonoEmergencia"
            maxLength={10}
            showCharCount
            required
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 2, md: 6 }}>
          <CustomTextField
            label="Parentesco"
            name="parentescoEmergencia"
            maxLength={26}
            showCharCount
            required
          />
        </Grid>
      </Grid>
    </>
  );
};

export default EmergencyContactForm;
