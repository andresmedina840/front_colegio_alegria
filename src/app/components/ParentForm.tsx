import { Grid, MenuItem, TextField, Typography } from "@mui/material";
import React from "react";

type ParentFormProps = {
  title: string;
  formData: Record<string, string>;
  handleChange: (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => void;
  tiposIdentificacion: string[];
};

const ParentForm: React.FC<ParentFormProps> = ({
  title,
  formData,
  handleChange,
  tiposIdentificacion,
}) => {
  return (
    <>
      <Typography variant="h5" align="left" sx={{ fontWeight: "bold", mb: 3 }}>
        {title}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3}>
          <TextField
            fullWidth
            label={`Primer Nombre ${title}`}
            name={`primerNombre${title}`}
            variant="outlined"
            value={formData[`primerNombre${title}`]}
            onChange={handleChange}
            helperText={`${
              formData[`primerNombre${title}`].length
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
            label={`Segundo Nombre ${title}`}
            name={`segundoNombre${title}`}
            variant="outlined"
            value={formData[`segundoNombre${title}`]}
            onChange={handleChange}
            helperText={`${
              formData[`segundoNombre${title}`].length
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
            label={`Primer Apellido ${title}`}
            name={`primerApellido${title}`}
            variant="outlined"
            value={formData[`primerApellido${title}`]}
            onChange={handleChange}
            helperText={`${
              formData[`primerApellido${title}`].length
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
            label={`Segundo Apellido ${title}`}
            name={`segundoApellido${title}`}
            variant="outlined"
            value={formData[`segundoApellido${title}`]}
            onChange={handleChange}
            helperText={`${
              formData[`segundoApellido${title}`].length
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
            label={`Tipo Identificación ${title}`}
            name={`tipoIdentificacion${title}`}
            value={formData[`tipoIdentificacion${title}`]}
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
            label={`Número Identificación ${title}`}
            name={`numeroIdentificacion${title}`}
            value={formData[`numeroIdentificacion${title}`]}
            onChange={handleChange}
            helperText={`${
              (formData[`numeroIdentificacion${title}`] || "").length
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
            label={`Numero Celular ${title}`}
            name={`numeroCelular${title}`}
            value={formData[`numeroCelular${title}`]}
            onChange={handleChange}
            helperText={`${
              (formData[`numeroCelular${title}`] || "").length
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
            label={`Direccion ${title}`}
            name={`direccion${title}`}
            value={formData[`direccion${title}`]}
            onChange={handleChange}
            helperText={`${
              (formData[`direccion${title}`] || "").length
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
            label={`Barrio ${title}`}
            name={`barrio${title}`}
            value={formData[`barrio${title}`]}
            onChange={handleChange}
            helperText={`${
              (formData[`barrio${title}`] || "").length
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
        <Grid item xs={12} sm={5}>
          <TextField
            fullWidth
            label={`Ocupación ${title}`}
            name={`ocupacion${title}`}
            value={formData[`ocupacion${title}`]}
            onChange={handleChange}
            helperText={`${
              (formData[`ocupacion${title}`] || "").length
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
        <Grid item xs={12} sm={7}>
          <TextField
            fullWidth
            label={`Correo Electrónico ${title}`}
            name={`correoElectronico${title}`}
            value={formData[`correoElectronico${title}`]}
            onChange={handleChange}
            helperText={`${
              (formData[`correoElectronico${title}`] || "").length
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
      </Grid>
    </>
  );
};

export default ParentForm;
