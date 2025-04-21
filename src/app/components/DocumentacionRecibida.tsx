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

interface DocumentacionRecibidaProps {
  siNo: OptionType[];
}

// Campos estrictamente definidos como claves válidas de FormDataType
const documentFields: (keyof FormDataType)[] = [
  "documentacionRecibidaRegistroCivil",
  "documentacionRecibidaCertificadosEstudios",
  "documentacionRecibidaCertificadoVinculado",
  "documentacionRecibidaSistemaSocial",
  "documentacionRecibidaFotos",
  "documentacionRecibidaEntidadAseguradora",
  "documentacionRecibidaSeguroEstudiantil",
  "documentacionRecibidaCertificadoEstratoSocioeconomico",
  "documentacionRecibidaPagoSalvo",
  "documentacionRecibidaRegistroVacunacion",
  "documentacionRecibidaExamenSerologia",
];

const DocumentacionRecibida: React.FC<DocumentacionRecibidaProps> = ({
  siNo,
}) => {
  const { control } = useFormContext<FormDataType>();

  return (
    <Card sx={{ p: 2, mb: 3, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography
          variant="h6"
          align="left"
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          Documentación Recibida
        </Typography>
        <Grid container spacing={2}>
          {documentFields.map((fieldName) => {
            const label = fieldName
              .replace("documentacionRecibida", "")
              .replace(/([A-Z])/g, " $1")
              .trim();

            return (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={fieldName}>
                <CustomAutocomplete<FormDataType, OptionType>
                  name={fieldName}
                  label={label}
                  options={siNo}
                  control={control}
                  getOptionLabel={(option: OptionType) => option.nombre}
                />
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DocumentacionRecibida;
