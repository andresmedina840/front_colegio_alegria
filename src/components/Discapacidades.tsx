"use client";

import { Grid, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Controller, Control } from "react-hook-form";
import { StudentInfoFormValues } from "@/schemas/studentInfoSchema";

interface DiscapacidadesProps {
  control: Control<StudentInfoFormValues>;
  siNo: string[];
}

const Discapacidades: React.FC<DiscapacidadesProps> = ({ control, siNo }) => {
  return (
    <>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
        Discapacidades
      </Typography>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12}}>
          <Controller
            name="discapacidadesNoAplica"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel id="discapacidad-label">¿Tiene alguna discapacidad?</InputLabel>
                <Select
                  {...field}
                  labelId="discapacidad-label"
                  label="¿Tiene alguna discapacidad?"
                >
                  {siNo.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Grid>

        {/* Puedes continuar con campos individuales por tipo si no aplica === "NO" */}
        {/* Ejemplo: */}
        <Grid size={{ xs: 12, sm: 6}}>
          <Controller
            name="discapacidadesParalisisCerebral"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth>
                <InputLabel>Parálisis cerebral</InputLabel>
                <Select {...field} label="Parálisis cerebral">
                  {siNo.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Discapacidades;
