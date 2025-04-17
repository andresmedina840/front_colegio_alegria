// src/app/components/HealthAffiliationForm.tsx
"use client";

import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import CustomTextField from "./personalizados/CustomTextField";
import CustomAutocomplete from "./personalizados/CustomAutocomplete";
import { FormDataType, FormField } from "../types/formTypes";
import { OpcionSelect } from "../types";

interface HealthAffiliationFormProps {
  formData: FormDataType;
  updateField: (field: FormField, value: string) => void;
  estratoEconomico: OpcionSelect[];
}

const HealthAffiliationForm: React.FC<HealthAffiliationFormProps> = ({
  formData,
  updateField,
  estratoEconomico,
}) => {
  const formFields = [
    {
      label: "Tipo de Sangre y RH",
      name: "tipoSangre" as FormField,
      maxLength: 5,
    },
    { label: "Eps Afiliado", name: "epsAfiliado" as FormField, maxLength: 45 },
    { label: "IPS Asignada", name: "ipsAsignada" as FormField, maxLength: 55 },
    { label: "ARS Afiliado", name: "arsAfiliado" as FormField, maxLength: 55 },
    {
      label: "Nro Carnet SISBEN",
      name: "nroCarnetSisben" as FormField,
      maxLength: 20,
    },
    {
      label: "Nivel de SISBEN",
      name: "nivelSisben" as FormField,
      maxLength: 5,
    },
  ];

  const handleEstratoChange = (_: unknown, newValue: OpcionSelect | null) => {
    updateField("estrato", newValue?.nombre || "");
  };

  const currentEstratoValue =
    estratoEconomico.find((option) => option.nombre === formData.estrato) ||
    null;

  return (
    <Card sx={{ p: 2, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography
          variant="h5"
          align="left"
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          Afiliación al sistema de salud
        </Typography>
        <Grid container spacing={2}>
          {formFields.map((field) => (
            <Grid size={{ xs: 12, sm: 2, md: 6 }} key={field.name}>
              <CustomTextField
                uppercase
                label={field.label}
                name={field.name}
                value={formData[field.name] || ""}
                updateField={updateField}
                maxLength={field.maxLength}
                showCharCount
              />
            </Grid>
          ))}

          <Grid size={{ xs: 12, sm: 2, md: 6 }}>
            <CustomAutocomplete<OpcionSelect>
              name="estrato"
              options={estratoEconomico}
              value={currentEstratoValue}
              onChange={handleEstratoChange}
              label="Estrato económico"
              required
              getOptionLabel={(option) => option.nombre}
              isOptionEqualToValue={(option, value) => option.id === value?.id}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default HealthAffiliationForm;
