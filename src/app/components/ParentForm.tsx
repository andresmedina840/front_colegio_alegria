import { Grid, MenuItem, Typography } from "@mui/material";
import React from "react";
import CustomTextField from "../components/personalizados/CustomTextField";
import CustomAutocomplete from "../components/personalizados/CustomAutocomplete";

type OpcionSelect = {
  id: string | number;
  nombre: string;
};

type ParentFormProps = {
  title: string;
  formData: Record<string, string>;
  handleChange: (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => void;
  tiposIdentificacion: OpcionSelect[];
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
        <Grid item xs={12} sm={5}>
          <CustomAutocomplete
            label={`Tipo Identificación ${title}`}
            name={`tipoIdentificacion${title}Id`}
            options={tiposIdentificacion}
            required
            value={
              (tiposIdentificacion as OpcionSelect[]).find(
                (tipo) => tipo.id === formData[`tipoIdentificacion${title}Id`]
              ) || null
            }
            onChange={(value: OpcionSelect | null) => {
              handleChange({
                target: {
                  name: `tipoIdentificacion${title}Id`,
                  value: value?.id || "",
                },
              } as React.ChangeEvent<HTMLInputElement>);
            }}
            getOptionLabel={(option: OpcionSelect) => option.nombre}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <CustomTextField
            label={`Número Identificación ${title}`}
            name={`numeroIdentificacion${title}`}
            required
            value={formData[`numeroIdentificacion${title}`] || ""}
            onChange={handleChange}
            helperText={`${
              (formData[`numeroIdentificacion${title}`] || "").length
            } / 12 caracteres`}
            slotProps={{
              htmlInput: {
                maxLength: 12,
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <CustomTextField
            fullWidth
            label={`Primer Nombre ${title}`}
            name={`primerNombre${title}`}
            variant="outlined"
            value={formData[`primerNombre${title}`] || ""}
            onChange={handleChange}
            helperText={`${
              formData[`primerNombre${title}`]?.length || 0
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
          <CustomTextField
            fullWidth
            label={`Segundo Nombre ${title}`}
            name={`segundoNombre${title}`}
            variant="outlined"
            value={formData[`segundoNombre${title}`] || ""}
            onChange={handleChange}
            helperText={`${
              formData[`segundoNombre${title}`]?.length || 0
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
          <CustomTextField
            fullWidth
            label={`Primer Apellido ${title}`}
            name={`primerApellido${title}`}
            variant="outlined"
            value={formData[`primerApellido${title}`] || ""}
            onChange={handleChange}
            helperText={`${
              formData[`primerApellido${title}`]?.length || 0
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
          <CustomTextField
            fullWidth
            label={`Segundo Apellido ${title}`}
            name={`segundoApellido${title}`}
            variant="outlined"
            value={formData[`segundoApellido${title}`] || ""}
            onChange={handleChange}
            helperText={`${
              formData[`segundoApellido${title}`]?.length || 0
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
      </Grid>
    </>
  );
};

export default ParentForm;
