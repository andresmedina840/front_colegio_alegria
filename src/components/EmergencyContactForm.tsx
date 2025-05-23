import { Grid, Typography } from "@mui/material";
import React from "react";
import { Control, UseFormRegister, FieldErrors } from "react-hook-form";
import { StudentInfoFormValues } from "@/schemas/studentInfoSchema";
import CustomTextField from "../components/personalizados/CustomTextField";

type EmergencyContactFormProps = {
  register: UseFormRegister<StudentInfoFormValues>; // aún útil si usas campos sin control
  control: Control<StudentInfoFormValues>;
  errors: FieldErrors<StudentInfoFormValues>; // no se necesita realmente aquí
  siNoOptions: { id: string; nombre: string }[];
};

const EmergencyContactForm: React.FC<EmergencyContactFormProps> = ({
  control,
}) => {
  return (
    <>
      <Typography variant="h5" align="left" sx={{ fontWeight: "bold", mb: 3 }}>
        Contacto de Emergencia
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomTextField
            name="primerNombreEmergencia"
            label="Primer Nombre"
            control={control}
            maxLength={26}
            showCharCount
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomTextField
            name="segundoNombreEmergencia"
            label="Segundo Nombre"
            control={control}
            maxLength={26}
            showCharCount
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomTextField
            name="primerApellidoEmergencia"
            label="Primer Apellido"
            control={control}
            maxLength={26}
            showCharCount
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomTextField
            name="segundoApellidoEmergencia"
            label="Segundo Apellido"
            control={control}
            maxLength={26}
            showCharCount
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomTextField
            name="telefonoEmergencia"
            label="Teléfono"
            control={control}
            maxLength={15}
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <CustomTextField
            name="parentescoEmergencia"
            label="Parentesco"
            control={control}
            maxLength={30}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default EmergencyContactForm;
