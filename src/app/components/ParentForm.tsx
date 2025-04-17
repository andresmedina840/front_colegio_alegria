"use client";

import { Grid, Typography } from "@mui/material";
import React from "react";
import CustomTextField from "../components/personalizados/CustomTextField";
import CustomAutocomplete from "../components/personalizados/CustomAutocomplete";
import { FormDataType } from "../types/formTypes";

type OpcionSelect = {
  id: string | number;
  nombre: string;
};

type ParentFormProps = {
  title: "Padre" | "Madre";
  formData: FormDataType;
  updateField: (field: keyof FormDataType, value: string) => void;
  tiposIdentificacion: OpcionSelect[];
};

const ParentForm: React.FC<ParentFormProps> = ({
  title,
  formData,
  updateField,
  tiposIdentificacion,
}) => {
  const field = (key: string) => `${key}${title}` as keyof FormDataType;

  const handleAutocompleteChange = (fieldName: keyof FormDataType) => (
    _: React.SyntheticEvent,
    value: OpcionSelect | null
  ) => {
    updateField(fieldName, value?.id.toString() || "");
  };

  return (
    <>
      <Typography variant="h5" align="left" sx={{ fontWeight: "bold", mb: 3 }}>
        {title}
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomAutocomplete
            label={`Tipo Identificación ${title}`}
            name={field("tipoIdentificacion")}
            options={tiposIdentificacion}
            required
            value={
              tiposIdentificacion.find(
                (tipo) => tipo.id === formData[field("tipoIdentificacion")]
              ) || null
            }
            onChange={handleAutocompleteChange(field("tipoIdentificacion"))}
            getOptionLabel={(option: OpcionSelect) => option.nombre}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField
            label={`Número Identificación ${title}`}
            name={field("numeroIdentificacion")}
            required
            uppercase
            value={formData[field("numeroIdentificacion")]}
            onChange={(e) =>
              updateField(
                field("numeroIdentificacion"),
                e.target.value
              )
            }
            maxLength={12}
            showCharCount
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField
            fullWidth
            label={`Primer Nombre ${title}`}
            name={field("primerNombre")}
            variant="outlined"
            uppercase
            value={formData[field("primerNombre")]}
            onChange={(e) =>
              updateField(field("primerNombre"), e.target.value)
            }
            maxLength={26}
            showCharCount
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField
            fullWidth
            label={`Segundo Nombre ${title}`}
            name={field("segundoNombre")}
            variant="outlined"
            uppercase
            value={formData[field("segundoNombre")]}
            onChange={(e) =>
              updateField(field("segundoNombre"), e.target.value)
            }
            maxLength={26}
            showCharCount
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField
            fullWidth
            label={`Primer Apellido ${title}`}
            name={field("primerApellido")}
            variant="outlined"
            uppercase
            value={formData[field("primerApellido")]}
            onChange={(e) =>
              updateField(field("primerApellido"), e.target.value)
            }
            maxLength={26}
            showCharCount
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField
            fullWidth
            label={`Segundo Apellido ${title}`}
            name={field("segundoApellido")}
            variant="outlined"
            uppercase
            value={formData[field("segundoApellido")]}
            onChange={(e) =>
              updateField(field("segundoApellido"), e.target.value)
            }
            maxLength={26}
            showCharCount
          />
        </Grid>
      </Grid>
    </>
  );
};

export default ParentForm;
