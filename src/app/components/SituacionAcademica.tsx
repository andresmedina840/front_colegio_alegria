"use client";

import {
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import CustomAutocomplete from "./personalizados/CustomAutocomplete";
import { FormDataType } from "../types/formTypes";

type OptionType = {
  id: string;
  nombre: string;
};

type SituacionAcademicaProps = {
  formData: FormDataType;
  handleChange: (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => void;
  siNo: OptionType[];
};

const SituacionAcademica: React.FC<SituacionAcademicaProps> = ({
  formData,
  handleChange,
  siNo,
}) => {
  const disableOtrosCampos = formData.capacidadesExceptionalesNoAplica === "NO";

  const handleAutocompleteChange = (fieldName: string) => (
    _: React.SyntheticEvent,
    value: OptionType | null
  ) => {
    handleChange({
      target: { 
        name: fieldName, 
        value: value ? value.id : "" 
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  const getCurrentValue = (fieldName: string) => {
    return siNo.find(option => option.id === formData[fieldName as keyof FormDataType]) || null;
  };

  return (
    <Card sx={{ p: 2, mb: 3, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" align="left" sx={{ fontWeight: "bold", mb: 3 }}>
          Situación académica
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 4 }}>
            <CustomAutocomplete
              label="No estudio en la vigencia anterior"
              name="situacionAcademicaNoEstudioVigenciaAnterior"
              options={siNo}
              value={getCurrentValue("situacionAcademicaNoEstudioVigenciaAnterior")}
              onChange={handleAutocompleteChange("situacionAcademicaNoEstudioVigenciaAnterior")}
              getOptionLabel={(option: OptionType) => option.nombre}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
            <CustomAutocomplete
              label="Aprobó"
              name="situacionAcademicaAprobo"
              options={siNo}
              value={getCurrentValue("situacionAcademicaAprobo")}
              onChange={handleAutocompleteChange("situacionAcademicaAprobo")}
              getOptionLabel={(option: OptionType) => option.nombre}
              disabled={disableOtrosCampos}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 2 }}>
            <CustomAutocomplete
              label="Reprobó"
              name="situcionAcademicaReprobo"
              options={siNo}
              value={getCurrentValue("situcionAcademicaReprobo")}
              onChange={handleAutocompleteChange("situcionAcademicaReprobo")}
              getOptionLabel={(option: OptionType) => option.nombre}
              disabled={disableOtrosCampos}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <CustomAutocomplete
              label="Pendiente de logros"
              name="situacionAcademicaPendienteLogros"
              options={siNo}
              value={getCurrentValue("situacionAcademicaPendienteLogros")}
              onChange={handleAutocompleteChange("situacionAcademicaPendienteLogros")}
              getOptionLabel={(option: OptionType) => option.nombre}
              disabled={disableOtrosCampos}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 3 }}>
            <CustomAutocomplete
              label="Viene de otra I.E."
              name="situacionAcademicaVieneOtraIE"
              options={siNo}
              value={getCurrentValue("situacionAcademicaVieneOtraIE")}
              onChange={handleAutocompleteChange("situacionAcademicaVieneOtraIE")}
              getOptionLabel={(option: OptionType) => option.nombre}
              disabled={disableOtrosCampos}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <CustomAutocomplete
              label="Ingresa por primera vez a la I.E."
              name="situcionAcademicaIngresaPrimeraVezIE"
              options={siNo}
              value={getCurrentValue("situcionAcademicaIngresaPrimeraVezIE")}
              onChange={handleAutocompleteChange("situcionAcademicaIngresaPrimeraVezIE")}
              getOptionLabel={(option: OptionType) => option.nombre}
              disabled={disableOtrosCampos}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <CustomAutocomplete
              label="No culminó estudios"
              name="situcionAcademicaNoCulminoEstudios"
              options={siNo}
              value={getCurrentValue("situcionAcademicaNoCulminoEstudios")}
              onChange={handleAutocompleteChange("situcionAcademicaNoCulminoEstudios")}
              getOptionLabel={(option: OptionType) => option.nombre}
              disabled={disableOtrosCampos}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SituacionAcademica;