"use client";

import { useEffect } from "react";
import { Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { FormDataType } from "../types/formTypes";
import CustomAutocomplete from "../components/personalizados/CustomAutocomplete";

interface OpcionSiNo {
  id: number;
  nombre: string;
}

interface CapacidadesExcepcionalesProps {
  formData: FormDataType;
  handleAutocompleteChange: (name: string, value: string) => void;
  siNo: string[];
}

const capacidadFields = [
  { name: "capacidadesExcepcionalesNoAplica", label: "No aplica" },
  { name: "capacidadesExcepcionalesSuperdotado", label: "Superdotado" },
  { name: "capacidadesExcepcionalesTalentoCientifico", label: "Con talento científico" },
  { name: "capacidadesExcepcionalesTalentoTecnologico", label: "Con talento tecnológico" },
  { name: "capacidadesExcepcionalesTalentoSubjetivo", label: "Con talento subjetivo" },
];

const CapacidadesExcepcionales: React.FC<CapacidadesExcepcionalesProps> = ({
  formData,
  siNo,
  handleAutocompleteChange,
}) => {
  const { control, setValue } = useFormContext<FormDataType>();
  const capacidadesExcepcionalesNoAplica = formData.capacidadesExcepcionalesNoAplica;

  useEffect(() => {
    if (capacidadesExcepcionalesNoAplica === "SI") {
      capacidadFields.forEach((field) => {
        if (field.name !== "capacidadesExcepcionalesNoAplica") {
          setValue(field.name as keyof FormDataType, "");
        }
      });
    } else if (capacidadesExcepcionalesNoAplica === "NO") {
      capacidadFields.forEach((field) => {
        if (field.name !== "capacidadesExcepcionalesNoAplica") {
          setValue(field.name as keyof FormDataType, "NO");
        }
      });
    }
  }, [capacidadesExcepcionalesNoAplica, setValue]);

  const opcionesSiNo: OpcionSiNo[] = siNo.map((option, index) => ({
    id: index,
    nombre: option,
  }));

  const disableOthers = capacidadesExcepcionalesNoAplica === "NO";

  return (
    <Grid container spacing={2}>
      {capacidadFields.map((field) => (
        <Grid size={{ xs: 12, sm: 4, md: 4 }} key={field.name}>
          <CustomAutocomplete<FormDataType, OpcionSiNo>
            label={field.label}
            name={field.name as keyof FormDataType}
            options={opcionesSiNo}
            control={control}
            getOptionLabel={(option) => option.nombre}
            onChange={(_, value) =>
              handleAutocompleteChange(field.name, value?.nombre || "")
            }
            disabled={field.name !== "capacidadesExcepcionalesNoAplica" && disableOthers}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default CapacidadesExcepcionales;
