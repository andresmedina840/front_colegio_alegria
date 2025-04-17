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

interface DocumentacionRecibidaProps {
  formData: FormDataType;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  formData,
  handleChange,
  siNo,
}) => {
  const handleAutocompleteChange = (fieldName: keyof FormDataType) => (
    _: React.SyntheticEvent,
    value: OptionType | null
  ) => {
    handleChange({
      target: {
        name: fieldName,
        value: value ? value.id : "",
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <Card sx={{ p: 2, mb: 3, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" align="left" sx={{ fontWeight: "bold", mb: 3 }}>
          Documentación Recibida
        </Typography>
        <Grid container spacing={2}>
          {documentFields.map((fieldName) => {
            const label = fieldName.replace("documentacionRecibida", "").replace(/([A-Z])/g, " $1").trim();
            const selectedOption = siNo.find(
              option => option.id === formData[fieldName]
            ) || null;

            return (
              <Grid key={fieldName} size={{ xs: 12, md: 3 }}>
                <CustomAutocomplete
                  name={fieldName}
                  label={label}
                  options={siNo}
                  value={selectedOption}
                  onChange={handleAutocompleteChange(fieldName)}
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
