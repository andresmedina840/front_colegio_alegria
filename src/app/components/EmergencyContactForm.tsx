import { Grid, MenuItem, TextField, Typography } from "@mui/material";
import React from "react";

type EmergencyContactFormProps = {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tiposIdentificacion: string[];
};

const EmergencyContactForm: React.FC<EmergencyContactFormProps> = ({
  formData,
  handleChange,
  tiposIdentificacion,
}) => {
  return (
    <>
      <Typography variant="h5" align="left" sx={{ fontWeight: "bold", mb: 3 }}>
        Contacto de Emergencia
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Primer Nombre Contacto Emergencia"
            name="primerNombreEmergencia"
            variant="outlined"
            value={formData.primerNombreEmergencia || ""}
            onChange={handleChange}
            helperText={`${
              (formData.primerNombreEmergencia || "").length
            } / 26 caracteres`}
            slotProps={{
              htmlInput: {
                maxLength: 26,
              },
              inputLabel: {
                shrink: true,
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Segundo Nombre Contacto Emergencia"
            name="segundoNombreEmergencia"
            variant="outlined"
            value={formData.segundoNombreEmergencia || ""}
            onChange={handleChange}
            helperText={`${
              (formData.segundoNombreEmergencia || "").length
            } / 26 caracteres`}
            slotProps={{
              htmlInput: {
                maxLength: 26,
              },
              inputLabel: {
                shrink: true,
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Primer Apellido Contacto Emergencia"
            name="primerApellidoEmergencia"
            variant="outlined"
            value={formData.primerApellidoEmergencia || ""}
            onChange={handleChange}
            helperText={`${
              (formData.primerApellidoEmergencia || "").length
            } / 26 caracteres`}
            slotProps={{
              htmlInput: {
                maxLength: 26,
              },
              inputLabel: {
                shrink: true,
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Segundo Apellido Contacto Emergencia"
            name="segundoApellidoEmergencia"
            variant="outlined"
            value={formData.segundoApellidoEmergencia || ""}
            onChange={handleChange}
            helperText={`${
              (formData.segundoApellidoEmergencia || "").length
            } / 26 caracteres`}
            slotProps={{
              htmlInput: {
                maxLength: 26,
              },
              inputLabel: {
                shrink: true,
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={5}>
          <TextField
            select
            fullWidth
            label="Tipo Identificación Contacto Emergencia"
            name="tipoIdentificacionEmergencia"
            value={formData.tipoIdentificacionEmergencia || ""}
            onChange={handleChange}
            slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
          >
            {tiposIdentificacion.map((tipo) => (
              <MenuItem key={tipo} value={tipo}>
                {tipo}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            fullWidth
            label="Número Identificación Contacto Emergencia"
            name="numeroIdentificacionEmergencia"
            value={formData.numeroIdentificacionEmergencia || ""}
            onChange={handleChange}
            helperText={`${
              (formData.numeroIdentificacionEmergencia || "").length
            } / 50 caracteres`}
            slotProps={{
              htmlInput: {
                maxLength: 50,
              },
              inputLabel: {
                shrink: true,
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label="Número Celular Contacto Emergencia"
            name="numeroCelularEmergencia"
            value={formData.numeroCelularEmergencia || ""}
            onChange={handleChange}
            helperText={`${
              (formData.numeroCelularEmergencia || "").length
            } / 10 caracteres`}
            slotProps={{
              htmlInput: {
                maxLength: 10,
              },
              inputLabel: {
                shrink: true,
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={8}>
          <TextField
            fullWidth
            label="Dirección Contacto Emergencia"
            name="direccionEmergencia"
            value={formData.direccionEmergencia || ""}
            onChange={handleChange}
            helperText={`${
              (formData.direccionEmergencia || "").length
            } / 60 caracteres`}
            slotProps={{
              htmlInput: {
                maxLength: 60,
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
            label="Parentesco Contacto Emergencia"
            name="parentescoEmergencia"
            value={formData.parentescoEmergencia || ""}
            onChange={handleChange}
            helperText={`${
              (formData.parentescoEmergencia || "").length
            } / 30 caracteres`}
            slotProps={{
                htmlInput: {
                  maxLength: 30,
                },
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
