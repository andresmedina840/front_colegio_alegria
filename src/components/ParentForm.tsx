"use client";

import { Grid, Typography } from "@mui/material";
import React from "react";
import { Control } from "react-hook-form";
import CustomTextField from "../components/personalizados/CustomTextField";
import CustomAutocomplete from "../components/personalizados/CustomAutocomplete";
import { StudentInfoFormValues } from "@/schemas/studentInfoSchema";

type OpcionSelect = {
  id: string | number;
  nombre: string;
};

type ParentFormProps = {
  title: "Padre" | "Madre";
  control: Control<StudentInfoFormValues>;
  tiposIdentificacion: OpcionSelect[];
};

const ParentForm: React.FC<ParentFormProps> = ({
  title,
  control,
  tiposIdentificacion,
}) => {
  const tipoIdentificacionField = `tipoIdentificacion${title}` as const;
  const numeroIdentificacionField = `numeroIdentificacion${title}` as const;
  const primerNombreField = `primerNombre${title}` as const;
  const segundoNombreField = `segundoNombre${title}` as const;
  const primerApellidoField = `primerApellido${title}` as const;
  const segundoApellidoField = `segundoApellido${title}` as const;

  return (
    <>
      <Typography variant="h5" align="left" sx={{ fontWeight: "bold", mb: 3 }}>
        {title}
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 5 }}>
          <CustomAutocomplete<StudentInfoFormValues, OpcionSelect>
            name={tipoIdentificacionField}
            control={control}
            label={`Tipo Identificación ${title}`}
            options={tiposIdentificacion}
            getOptionLabel={(option) => option.nombre}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomTextField
            name={numeroIdentificacionField}
            control={control}
            label={`Número Identificación ${title}`}
            maxLength={12}
            uppercase
            showCharCount
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 3 }}>
          <CustomTextField
            name={primerNombreField}
            control={control}
            label={`Primer Nombre ${title}`}
            maxLength={26}
            uppercase
            showCharCount
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 3 }}>
          <CustomTextField
            name={segundoNombreField}
            control={control}
            label={`Segundo Nombre ${title}`}
            maxLength={26}
            uppercase
            showCharCount
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 3 }}>
          <CustomTextField
            name={primerApellidoField}
            control={control}
            label={`Primer Apellido ${title}`}
            maxLength={26}
            uppercase
            showCharCount
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 3 }}>
          <CustomTextField
            name={segundoApellidoField}
            control={control}
            label={`Segundo Apellido ${title}`}
            maxLength={26}
            uppercase
            showCharCount
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ParentForm;
