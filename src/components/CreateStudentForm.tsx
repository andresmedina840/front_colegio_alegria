// CreateStudentForm.tsx
"use client";

import React, { useEffect } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import api from "../axios/axiosClient";
import dayjs from "dayjs";

import { studentInfoSchema, StudentInfoFormValues } from "@/schemas/studentInfoSchema";
import { initialDataRegistroEstudiantes } from "@/estudiantes/initialDataRegistroEstudiantes";
import HealthAffiliationForm from "./HealthAffiliationForm";

const estratos = ["1", "2", "3", "4", "5", "6"];

const CreateStudentForm = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    setValue,
  } = useForm<StudentInfoFormValues>({
    resolver: zodResolver(studentInfoSchema),
    defaultValues: initialDataRegistroEstudiantes,
  });

  const fechaNacimiento = watch("fechaNacimiento");

  useEffect(() => {
    if (!fechaNacimiento) return;
    const parts = fechaNacimiento.split("/");
    if (parts.length !== 3) return;
    const [day, month, year] = parts;
    const birthDate = dayjs(`${year}-${month}-${day}`);
    const today = dayjs();
    if (birthDate.isValid()) {
      const age = today.diff(birthDate, "year");
      setValue("edad", `${age}`);
    }
  }, [fechaNacimiento, setValue]);

  const onSubmit = async (data: StudentInfoFormValues) => {
    try {
      await api.post("/estudiantes/registro", data);
      enqueueSnackbar("Estudiante registrado exitosamente", { variant: "success" });
      router.push("/estudiantes");
    } catch (error: unknown) {
      if (typeof error === "object" && error && "response" in error) {
        const err = error as { response?: { data?: { message?: string } } };
        enqueueSnackbar(err.response?.data?.message || "Error al registrar", { variant: "error" });
      } else {
        enqueueSnackbar("Error desconocido", { variant: "error" });
      }
    }
  };

  return (
    <Box sx={{ p: 3, backgroundColor: "#fff", boxShadow: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Registro de Estudiante
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          {/* Aquí puedes insertar otros componentes como EnrollmentInfoForm, StudentInfoForm, etc. */}

          <Grid size={{ xs: 12 }}>
            <HealthAffiliationForm control={control} estratoEconomico={estratos} />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Button type="submit" fullWidth variant="contained" sx={{ py: 2 }}>
              Registrar Estudiante
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default CreateStudentForm;
