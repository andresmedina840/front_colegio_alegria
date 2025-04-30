"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { FormValues } from "@/app/types/formTypes";

const ResumenTotales = () => {
  const { watch } = useFormContext<FormValues>();
  const materias = watch("materias") || [];

  const totalHoras = materias.reduce(
    (acc, m) => acc + (m.intensidadHoraria || 0),
    0
  );
  const totalFallas = materias.reduce((acc, m) => acc + (m.fallas || 0), 0);
  const notasValidas = materias.filter((m) => m.valoracion > 0);
  const promedioFinal =
    notasValidas.length > 0
      ? notasValidas.reduce((acc, m) => acc + m.valoracion, 0) /
        notasValidas.length
      : 0;

  return (
    <Grid container spacing={2} mb={3}>
      {[
        ["Total Horas", totalHoras],
        ["Total Fallas", totalFallas],
        ["Promedio Final", promedioFinal.toFixed(2)],
      ].map(([label, value]) => (
        <Grid size={{ xs: 12, sm: 4 }} key={label}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="subtitle1" fontWeight="bold">
                {label}
              </Typography>
              <Typography variant="h6">{value}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ResumenTotales;
