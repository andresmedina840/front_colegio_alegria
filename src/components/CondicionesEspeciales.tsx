"use client";

import { Card, CardContent, Typography, Grid } from "@mui/material";
import Discapacidades from "./Discapacidades";
import CapacidadesExcepcionales from "./CapacidadesExcepcionales";
import { Control } from "react-hook-form";
import { StudentInfoFormValues } from "@/schemas/studentInfoSchema";

interface CondicionesEspecialesProps {
  control: Control<StudentInfoFormValues>;
  siNo: string[];
}

const CondicionesEspeciales: React.FC<CondicionesEspecialesProps> = ({
  control,
  siNo,
}) => {
  return (
    <Card sx={{ p: 2, mb: 3, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" align="left" sx={{ fontWeight: "bold", mb: 3 }}>
          Condiciones Especiales del Estudiante
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Discapacidades control={control} siNo={siNo} />
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <CapacidadesExcepcionales control={control} siNo={siNo} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CondicionesEspeciales;
