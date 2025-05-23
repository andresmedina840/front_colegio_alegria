"use client";

import { Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Controller, Control } from "react-hook-form";
import { StudentInfoFormValues } from "@/schemas/studentInfoSchema";

interface CapacidadesExcepcionalesProps {
  control: Control<StudentInfoFormValues>;
  siNo: string[];
}

const CapacidadesExcepcionales: React.FC<CapacidadesExcepcionalesProps> = ({
  control,
  siNo,
}) => {
  return (
    <>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
        Capacidades Excepcionales
      </Typography>

      <Controller
        name="capacidadesExcepcionalesNoAplica"
        control={control}
        render={({ field }) => (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="capacidad-excepcional-label">
              ¿Tiene capacidades excepcionales?
            </InputLabel>
            <Select
              {...field}
              labelId="capacidad-excepcional-label"
              label="¿Tiene capacidades excepcionales?"
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

      {/** Puedes agregar más campos aquí si `capacidadesExcepcionalesNoAplica === "SI"` */}
    </>
  );
};

export default CapacidadesExcepcionales;
