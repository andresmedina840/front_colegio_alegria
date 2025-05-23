// HealthAffiliationForm.tsx
"use client";

import { Card, CardContent, Grid, Typography } from "@mui/material";
import { Control } from "react-hook-form";
import CustomTextField from "./personalizados/CustomTextField";
import CustomAutocomplete from "./personalizados/CustomAutocomplete";
import { StudentInfoFormValues } from "@/schemas/studentInfoSchema";

interface OptionType {
  id: string;
  nombre: string;
}

interface HealthAffiliationFormProps {
  control: Control<StudentInfoFormValues>;
  estratoEconomico: string[];
}

export default function HealthAffiliationForm({
  control,
  estratoEconomico,
}: HealthAffiliationFormProps) {
  const estratosOptions: OptionType[] = estratoEconomico.map((estrato) => ({
    id: estrato,
    nombre: estrato,
  }));

  return (
    <Card sx={{ p: 2, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h5" align="left" sx={{ fontWeight: "bold", mb: 3 }}>
          Afiliación al sistema de salud
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 3 }}>
            <CustomTextField
              name="tipoSangre"
              control={control}
              label="Tipo de Sangre y RH"
              maxLength={5}
              uppercase
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 3 }}>
            <CustomTextField
              name="epsAfiliado"
              control={control}
              label="EPS Afiliado"
              maxLength={45}
              uppercase
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 3 }}>
            <CustomTextField
              name="ipsAsignada"
              control={control}
              label="IPS Asignada"
              maxLength={55}
              uppercase
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 3 }}>
            <CustomTextField
              name="arsAfiliado"
              control={control}
              label="ARS Afiliado"
              maxLength={55}
              uppercase
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 3 }}>
            <CustomTextField
              name="nroCarnetSisben"
              control={control}
              label="Nro Carnet SISBEN"
              maxLength={20}
              uppercase
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 3 }}>
            <CustomTextField
              name="nivelSisben"
              control={control}
              label="Nivel de SISBEN"
              maxLength={5}
              uppercase
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 3 }}>
            <CustomAutocomplete<StudentInfoFormValues, OptionType>
              name="estrato"
              control={control}
              label="Estrato económico"
              options={estratosOptions}
              getOptionLabel={(option) => option.nombre}
              getOptionValue={(option) => option.id}
              required
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
