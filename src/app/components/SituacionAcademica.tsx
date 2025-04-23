"use client";

import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import CustomAutocomplete from "./personalizados/CustomAutocomplete";
import { FormDataType } from "../types/formTypes";
import { useFormContext } from "react-hook-form";

type OptionType = {
  id: string;
  nombre: string;
};

type SituacionAcademicaProps = {
  formData: FormDataType;
  handleChange: (e: {
    target: {
      name: string;
      value: string | number | boolean | null | undefined;
    };
  }) => void;
  siNo: OptionType[];
};

const SituacionAcademica: React.FC<SituacionAcademicaProps> = ({
  handleChange,
  siNo,
}) => {
  const { control } = useFormContext<FormDataType>();

  const handleAutocompleteChange =
    (fieldName: string) =>
    (_: React.SyntheticEvent, value: OptionType | null) => {
      handleChange({
        target: {
          name: fieldName,
          value: value ? value.id : "",
        },
      });
    };

  return (
    <Card sx={{ p: 2, mb: 3, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography
          variant="h6"
          align="left"
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          Situación académica
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 4, md: 4 }}>
            <CustomAutocomplete<FormDataType, OptionType>
              label="No estudió en la vigencia anterior"
              name="situacionAcademicaNoEstudioVigenciaAnterior"
              options={siNo}
              control={control}
              onChange={handleAutocompleteChange(
                "situacionAcademicaNoEstudioVigenciaAnterior"
              )}
              getOptionLabel={(option: OptionType) => option.nombre}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 2, md: 2 }}>
            <CustomAutocomplete<FormDataType, OptionType>
              label="Aprobó"
              name="situacionAcademicaAprobo"
              options={siNo}
              control={control}
              onChange={handleAutocompleteChange("situacionAcademicaAprobo")}
              getOptionLabel={(option: OptionType) => option.nombre}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 2, md: 2 }}>
            <CustomAutocomplete<FormDataType, OptionType>
              label="Reprobó"
              name="situacionAcademicaReprobo"
              options={siNo}
              control={control}
              onChange={handleAutocompleteChange("situacionAcademicaReprobo")}
              getOptionLabel={(option: OptionType) => option.nombre}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4, md: 4 }}>
            <CustomAutocomplete<FormDataType, OptionType>
              label="Pendiente de logros"
              name="situacionAcademicaPendienteLogros"
              options={siNo}
              control={control}
              onChange={handleAutocompleteChange(
                "situacionAcademicaPendienteLogros"
              )}
              getOptionLabel={(option: OptionType) => option.nombre}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 3, md: 3 }}>
            <CustomAutocomplete<FormDataType, OptionType>
              label="Viene de otra I.E."
              name="situacionAcademicaVieneOtraIE"
              options={siNo}
              control={control}
              onChange={handleAutocompleteChange(
                "situacionAcademicaVieneOtraIE"
              )}
              getOptionLabel={(option: OptionType) => option.nombre}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4, md: 4 }}>
            <CustomAutocomplete<FormDataType, OptionType>
              label="Ingresa por primera vez a la I.E."
              name="situacionAcademicaIngresaPrimeraVezIE"
              options={siNo}
              control={control}
              onChange={handleAutocompleteChange(
                "situacionAcademicaIngresaPrimeraVezIE"
              )}
              getOptionLabel={(option: OptionType) => option.nombre}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 5, md: 5 }}>
            <CustomAutocomplete<FormDataType, OptionType>
              label="No culminó estudios"
              name="situacionAcademicaNoCulminoEstudios"
              options={siNo}
              control={control}
              onChange={handleAutocompleteChange(
                "situacionAcademicaNoCulminoEstudios"
              )}
              getOptionLabel={(option: OptionType) => option.nombre}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SituacionAcademica;
