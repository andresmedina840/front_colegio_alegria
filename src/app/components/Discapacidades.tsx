"use client";

import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { FormDataType } from "../types/formTypes";
import CustomAutocomplete from "./personalizados/CustomAutocomplete";

interface OpcionSiNo {
  id: string;
  nombre: string;
}

interface DiscapacidadesProps {
  siNo: string[];
}

const discapacidadFields = [
  { name: "discapacidadesNoAplica", label: "No aplica" },
  { name: "discapacidadesSorderaProfunda", label: "Sordera profunda" },
  { name: "discapacidadesHipoacusiaBajaVision", label: "Hipoacusia o baja visión" },
  { name: "discapacidadesBajaVisionDiagnosticada", label: "Baja visión diagnosticada" },
  { name: "discapacidadesParalisisCerebral", label: "Parálisis cerebral" },
  { name: "discapacidadesAutismo", label: "Autismo" },
  { name: "discapacidadesDeficienciaCognitiva", label: "Deficiencia cognitiva" },
  { name: "discapacidadesSindromeDown", label: "Síndrome de Down" },
  { name: "discapacidadesMultiple", label: "Múltiple" },
];

const Discapacidades: React.FC<DiscapacidadesProps> = ({ siNo }) => {
  const { watch, setValue, control } = useFormContext<FormDataType>();
  const discapacidadesNoAplica = watch("discapacidadesNoAplica");

  useEffect(() => {
    if (discapacidadesNoAplica === "SI") {
      discapacidadFields.forEach((field) => {
        if (field.name !== "discapacidadesNoAplica") {
          setValue(field.name as keyof FormDataType, "");
        }
      });
    } else if (discapacidadesNoAplica === "NO") {
      discapacidadFields.forEach((field) => {
        if (field.name !== "discapacidadesNoAplica") {
          setValue(field.name as keyof FormDataType, "NO");
        }
      });
    }
  }, [discapacidadesNoAplica, setValue]);

  const opciones: OpcionSiNo[] = siNo.map((option, index) => ({
    id: String(index),
    nombre: option,
  }));

  return (
    <Grid container spacing={2}>
      {discapacidadFields.map((field) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={field.name}>
          <CustomAutocomplete<FormDataType, OpcionSiNo>
            label={field.label}
            name={field.name as keyof FormDataType}
            options={opciones}
            control={control}
            getOptionLabel={(option: OpcionSiNo) => option.nombre}
            disabled={field.name !== "discapacidadesNoAplica" && discapacidadesNoAplica === "NO"}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Discapacidades;
