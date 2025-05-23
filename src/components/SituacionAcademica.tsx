// SituacionAcademica.tsx
"use client";

import { Card, CardContent, Grid, Typography } from "@mui/material";
import { Control } from "react-hook-form";
import CustomAutocomplete from "./personalizados/CustomAutocomplete";
import { StudentInfoFormValues } from "@/schemas/studentInfoSchema";

type OptionType = {
  id: string;
  nombre: string;
};

type SituacionAcademicaProps = {
  control: Control<StudentInfoFormValues>;
  siNo: OptionType[];
  formData: StudentInfoFormValues;
};

const SituacionAcademica: React.FC<SituacionAcademicaProps> = ({
  control,
  siNo,
  formData,
}) => {
  const disableOtrosCampos = formData.capacidadesExcepcionalesNoAplica === "NO";

  return (
    <Card sx={{ p: 2, mb: 3, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" align="left" sx={{ fontWeight: "bold", mb: 3 }}>
          Situación académica
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 4}}>
            <CustomAutocomplete
              name="situacionAcademicaNoEstudioVigenciaAnterior"
              control={control}
              label="No estudió en la vigencia anterior"
              options={siNo}
              getOptionLabel={(option: OptionType) => option.nombre}
              getOptionValue={(option: OptionType) => option.id}
              required
              disabled={disableOtrosCampos}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4}}>
            <CustomAutocomplete
              name="situacionAcademicaAprobo"
              control={control}
              label="Aprobó"
              options={siNo}
              getOptionLabel={(option) => option.nombre}
              getOptionValue={(option) => option.id}
              required
              disabled={disableOtrosCampos}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4}}>
            <CustomAutocomplete
              name="situacionAcademicaReprobo"
              control={control}
              label="Reprobó"
              options={siNo}
              getOptionLabel={(option) => option.nombre}
              getOptionValue={(option) => option.id}
              required
              disabled={disableOtrosCampos}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4}}>
            <CustomAutocomplete
              name="situacionAcademicaPendienteLogros"
              control={control}
              label="Pendiente por logros"
              options={siNo}
              getOptionLabel={(option) => option.nombre}
              getOptionValue={(option) => option.id}
              required
              disabled={disableOtrosCampos}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4}}>
            <CustomAutocomplete
              name="situacionAcademicaVieneOtraIE"
              control={control}
              label="Viene de otra IE"
              options={siNo}
              getOptionLabel={(option) => option.nombre}
              getOptionValue={(option) => option.id}
              required
              disabled={disableOtrosCampos}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4}}>
            <CustomAutocomplete
              name="situacionAcademicaIngresaPrimeraVezIE"
              control={control}
              label="Ingresa por primera vez a la IE"
              options={siNo}
              getOptionLabel={(option) => option.nombre}
              getOptionValue={(option) => option.id}
              required
              disabled={disableOtrosCampos}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 4}}>
            <CustomAutocomplete
              name="situacionAcademicaNoCulminoEstudios"
              control={control}
              label="No culminó estudios"
              options={siNo}
              getOptionLabel={(option) => option.nombre}
              getOptionValue={(option) => option.id}
              required
              disabled={disableOtrosCampos}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SituacionAcademica;
