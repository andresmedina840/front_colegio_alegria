import { Grid, Typography } from "@mui/material";
import React from "react";
import CustomTextField from "../components/personalizados/CustomTextField";

type EmergencyContactFormProps = {
  formData: Record<string, string>;
  handleChange: (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => void;
  // Eliminamos tiposIdentificacion ya que no se usa
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
        <Grid item xs={12} sm={12}>
          <CustomTextField
            fullWidth
            label="Primer Nombre Contacto Emergencia"
            name="primerNombreEmergencia"
            variant="outlined"
            value={formData.primerNombreEmergencia || ""}
            onChange={handleChange}
            helperText={`${(formData.primerNombreEmergencia || "").length} / 26 caracteres`}
            inputProps={{
              maxLength: 26,
            }}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default EmergencyContactForm;