"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Snackbar,
  Alert,
  AlertColor,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import api from "../axios/axiosClient";
import useFetchData from "@/hooks/useFetchData";
import EnrollmentInfoForm from "./EnrollmentInfoForm";
import StudentInfoForm from "./StudentInfoForm";
import HealthAffiliationForm from "./HealthAffiliationForm";
import EnhancedPaper from "@/components/personalizados/EnhancedPaper";
import SchoolIcon from "@mui/icons-material/School";
import {
  studentInfoSchema,
  StudentInfoFormValues,
} from "@/schemas/studentInfoSchema";
import { initialDataRegistroEstudiantes } from "@/estudiantes/initialDataRegistroEstudiantes";

const steps = [
  "Información de matrícula",
  "Información personal",
  "Afiliación de salud",
  "Discapacidades",
  "Capacidades excepcionales",
  "Situación académica",
  "Información de padres",
  "Documentación recibida",
  "Autorizaciones",
  "Contacto de emergencia",
  "Acudientes",
];

const CreateStudentForm = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" as AlertColor });

  const {
    tiposIdentificacion,
    estratoEconomico,
    grados,
    paises,
    departamentos,
    ciudades,
    setDepartamentos,
    setCiudades,
  } = useFetchData();

  const [generos, setGeneros] = useState<{ id: string; nombre: string }[]>([]);

  const {
    control,
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { isValid, errors },
  } = useForm<StudentInfoFormValues>({
    resolver: zodResolver(studentInfoSchema),
    defaultValues: initialDataRegistroEstudiantes,
    mode: "onChange",
  });

  const fechaNacimiento = watch("fechaNacimiento");

  useEffect(() => {
    const fetchGeneros = async () => {
      try {
        const response = await api.get("/v1/api/generos");
        setGeneros(response.data);
      } catch (error) {
        console.error("Error al obtener géneros:", error);
      }
    };
    fetchGeneros();
  }, []);

  useEffect(() => {
    if (!fechaNacimiento) return;
    const parts = fechaNacimiento.split("/");
    if (parts.length !== 3) return;
    const [day, month, year] = parts;
    const birthDate = dayjs(`${year}-${month}-${day}`);
    const today = dayjs();
    if (birthDate.isValid()) {
      const age = today.diff(birthDate, "year");
      setValue("edad", `${age}`, { shouldValidate: true });
    }
  }, [fechaNacimiento, setValue]);

  const showSnackbar = (message: string, severity: AlertColor = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => setSnackbar((prev) => ({ ...prev, open: false }));

  const handleNext = async () => {
    let isValidStep = false;
    try {
      switch (activeStep) {
        case 0:
          isValidStep = await trigger(["numeroMatricula", "fechaMatricula"]);
          break;
        case 1:
          isValidStep = await trigger([
            "tipoIdentificacionEstudianteId",
            "numeroIdentificacionEstudiante",
            "primerNombreEstudiante",
            "primerApellidoEstudiante",
            "generoEstudianteId",
            "fechaNacimiento",
            "paisNacimiento",
            "departamentoNacimiento",
            "municipioNacimiento",
            "sedeMatricula",
            "gradoId",
            "jornada",
          ]);
          break;
        case 2:
          isValidStep = await trigger(["epsAfiliado", "estrato"]);
          break;
        case 8:
          isValidStep = await trigger([
            "autorizacionContactoEmergencia",
            "autorizacionImagen",
            "veracidadInformacion",
          ]);
          break;
        default:
          isValidStep = true;
      }
      if (isValidStep) setActiveStep((prev) => prev + 1);
      else showSnackbar("Por favor complete todos los campos requeridos", "error");
    } catch (error) {
      showSnackbar("Ocurrió un error al validar el formulario", "error");
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const onSubmit = async (data: StudentInfoFormValues) => {
    try {
      await api.post("/estudiantes/registro", data);
      showSnackbar("Estudiante registrado exitosamente");
      router.push("/estudiantes");
    } catch (error: any) {
      showSnackbar(error?.response?.data?.message || "Error al registrar", "error");
    }
  };

  const renderStepContent = (step: number) => (
    <EnhancedPaper title={steps[step]} icon={SchoolIcon}>
      {step === 0 && <EnrollmentInfoForm control={control} errors={errors} trigger={trigger} />}

      {step === 1 && (
        <StudentInfoForm
          control={control}
          register={register}
          errors={errors}
          tiposIdentificacion={tiposIdentificacion}
          generos={generos}
          grados={grados}
          paises={paises}
          departamentos={departamentos}
          ciudades={ciudades}
        />
      )}
      {step === 2 && <EnrollmentInfoForm control={control} errors={errors} trigger={trigger} />}
    </EnhancedPaper>
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container justifyContent="center">
            <Grid size={{ xs: 12, md: 10 }}>
              <Box sx={{ overflowX: "auto" }}>
                <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4, minWidth: "800px" }}>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>

              {renderStepContent(activeStep)}

              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4, gap: 2 }}>
                <Button variant="outlined" onClick={handleBack} disabled={activeStep === 0} sx={{ minWidth: 120, py: 1.5 }}>
                  Anterior
                </Button>
                {activeStep === steps.length - 1 ? (
                  <Button type="submit" variant="contained" disabled={!isValid} sx={{ minWidth: 200, py: 1.5, fontWeight: "bold" }}>
                    Registrar Estudiante
                  </Button>
                ) : (
                  <Button variant="contained" onClick={handleNext} sx={{ minWidth: 120, py: 1.5 }}>
                    Siguiente
                  </Button>
                )}
              </Box>
            </Grid>
          </Grid>
        </form>

        <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </LocalizationProvider>
  );
};

export default CreateStudentForm;
