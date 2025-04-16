import { Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import CustomTextField from "./personalizados/CustomTextField";
import CustomAutocomplete from "./personalizados/CustomAutocomplete";

interface OptionType {
  id: string;
  nombre: string;
  [key: string]: unknown;
}

interface HealthAffiliationFormProps {
  formData: Record<string, string>;
  handleChange: (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => void;
  estratoEconomico: string[];
}

const HealthAffiliationForm: React.FC<HealthAffiliationFormProps> = ({
  formData,
  handleChange,
  estratoEconomico,
}) => {
  const [estratosOptions, setEstratosOptions] = useState<OptionType[]>(() => {
    return estratoEconomico.map((estrato) => ({
      id: estrato,
      nombre: estrato,
    }));
  });

  useEffect(() => {
    setEstratosOptions(
      estratoEconomico.map((estrato) => ({
        id: estrato,
        nombre: estrato,
      }))
    );
  }, [estratoEconomico]);

  const formFields = [
    { label: "Tipo de Sangre y RH", name: "tipoSangre", maxLength: 5 },
    { label: "Eps Afiliado", name: "epsAfiliado", maxLength: 45 },
    { label: "IPS Asignada", name: "ipsAsignada", maxLength: 55 },
    { label: "ARS Afiliado", name: "arsAfiliado", maxLength: 55 },
    { label: "Nro Carnet SISBEN", name: "nroCarnetSisben", maxLength: 20 },
    { label: "Nivel de SISBEN", name: "nivelSisben", maxLength: 5 },
  ];

  const handleEstratoChange = (_: unknown, newValue: OptionType | null) => {
    handleChange({
      target: {
        name: "estrato",
        value: newValue?.nombre || "",
      },
    } as React.ChangeEvent<{ name?: string; value: unknown }>);
  };

  const currentEstratoValue = estratoEconomico.includes(formData.estrato)
    ? { id: formData.estrato, nombre: formData.estrato }
    : null;

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
            <Grid size={{ xs: 12, md: 4 }} key={field.name}>
              <CustomTextField
                uppercase
                label={field.label}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                maxLength={30}
                showCharCount
              />
            </Grid>
          ))}

          <Grid size={{ xs: 12, md: 4 }}>
            <CustomAutocomplete
              name="estrato"
              options={estratosOptions}
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
