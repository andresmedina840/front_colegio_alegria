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
  { name: "noAplica", label: "No aplica" },
  { name: "sorderaProfunda", label: "Sordera profunda" },
  { name: "hipoacusiaBajaVision", label: "Hipoacusia o baja visión" },
  { name: "bajaVisionDiagnosticada", label: "Baja visión diagnosticada" },
  { name: "paralisisCerebral", label: "Parálisis cerebral" },
  { name: "autismo", label: "Autismo" },
  { name: "deficienciaCognitiva", label: "Deficiencia cognitiva" },
  { name: "sindromeDown", label: "Síndrome de Down" },
  { name: "multiple", label: "Múltiple" },
];

const Discapacidades: React.FC<DiscapacidadesProps> = ({ siNo }) => {
  const { watch, setValue, control } = useFormContext<FormDataType>();
  const noAplica = watch("noAplica");

  useEffect(() => {
    if (noAplica === "SI") {
      discapacidadFields.forEach((field) => {
        if (field.name !== "noAplica") {
          setValue(field.name as keyof FormDataType, "");
        }
      });
    }
  }, [noAplica, setValue]);

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
            disabled={field.name !== "noAplica" && noAplica === "SI"}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Discapacidades;
