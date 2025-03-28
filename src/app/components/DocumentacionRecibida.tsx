"use client";

import {
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import CustomAutocomplete from "./personalizados/CustomAutocomplete";

type OptionType = {
  id: string;
  nombre: string;
};

type DocumentacionRecibidaProps = {
  formData: Record<string, string>;
  handleChange: (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => void;
  siNo: OptionType[];
};

const DocumentacionRecibida: React.FC<DocumentacionRecibidaProps> = ({
  formData,
  handleChange,
  siNo,
}) => {
  const documentFields = [
    "RegistroCivil",
    "CertificadosEstudios",
    "CertificadoVinculado",
    "SistemaSocial",
    "Fotos",
    "EntidadAseguradora",
    "SeguroEstudiantil",
    "CertificadoEstratoSocioeconomico",
    "PagoSalvo",
    "RegistroVacunacion",
    "ExamenSerologia",
  ];

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

  return (
    <Card sx={{ p: 2, mb: 3, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" align="left" sx={{ fontWeight: "bold", mb: 3 }}>
          Documentación Recibida
        </Typography>
        <Grid container spacing={2}>
          {documentFields.map((doc) => {
            const fieldName = `documentacionRecibida${doc}`;
            const selectedOption = siNo.find(
              option => option.id === formData[fieldName]
            ) || null;

            return (
              <Grid item xs={12} sm={3} key={doc}>
                <CustomAutocomplete
                  name={fieldName}
                  label={doc.replace(/([A-Z])/g, " $1").trim()}
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