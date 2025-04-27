"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Paper,
  useTheme,
  useMediaQuery,
  LinearProgress,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { motion, AnimatePresence } from "framer-motion";
import api from "../axios/axiosClient";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { studentInfoSchema } from "../schemas/studentInfoSchema";
import { OpcionSelect } from "../types";
import EnrollmentInfoForm from "./EnrollmentInfoForm";
import StudentInfoForm from "./StudentInfoForm";
import HealthAffiliationForm from "./HealthAffiliationForm";
import CondicionesEspeciales from "./CondicionesEspeciales";
import SituacionAcademica from "./SituacionAcademica";
import DocumentacionRecibida from "./DocumentacionRecibida";
import ParentForm from "./ParentForm";
import EmergencyContactForm from "./EmergencyContactForm";
import CustomAutocomplete from "./personalizados/CustomAutocomplete";
import AcudientesForm from "./AcudientesForm";
import initialFormData from "../estudiantes/initialFormData";
import { FormDataType } from "../types/formTypes";
import { useCatalogosEstudiantes } from "../hooks/apisEstudiantes";

// Íconos
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CircleIcon from "@mui/icons-material/Circle";

// --- CONSTANTES ---
const siNo: OpcionSelect[] = [
  { id: "SI", nombre: "SI" },
  { id: "NO", nombre: "NO" },
];

const steps = [
  "Matrícula",
  "Estudiante",
  "Salud",
  "Condiciones",
  "Situación Académica", // Nuevo paso separado
  "Documentos",
  "Acudientes",
  "Padre",
  "Madre",
  "Emergencia",
  "Autorizaciones",
];

const LOCAL_STORAGE_KEY = "create-student-form-data";

// --- CUSTOM STEP ICON ---
interface CustomStepIconProps {
  active: boolean;
  completed: boolean;
}

const CustomStepIcon = ({ active, completed }: CustomStepIconProps) => (
  <motion.div
    initial={false}
    animate={{
      scale: completed ? 1.2 : active ? 1.1 : 1,
      opacity: completed ? 1 : 0.8,
    }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
  >
    {completed ? (
      <CheckCircleIcon color="success" />
    ) : active ? (
      <CircleIcon color="primary" />
    ) : (
      <RadioButtonUncheckedIcon color="disabled" />
    )}
  </motion.div>
);

// --- COMPONENTE PRINCIPAL ---
const CreateStudentForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<FormDataType>({
    resolver: yupResolver(studentInfoSchema),
    defaultValues: initialFormData,
    mode: "onBlur",
  });

  const { handleSubmit, reset, watch, setValue, control } = methods;
  const formData = watch();

  const {
    grados,
    generos,
    paises,
    tiposIdentificacion,
    sedes,
    estratosEconomico,
    tiposAcudiente,
    loading,
  } = useCatalogosEstudiantes();

  const [departamentos, setDepartamentos] = useState<OpcionSelect[]>([]);
  const [ciudades, setCiudades] = useState<OpcionSelect[]>([]);
  const jornadaEscolar = ["Mañana", "Tarde", "Completa"];

  const progressPercentage = (activeStep / (steps.length - 1)) * 100;

  const updateField = useCallback(
    (field: keyof FormDataType, value: string) => {
      setValue(field, value);
    },
    [setValue]
  );

  const updateFields = useCallback(
    (fields: Partial<FormDataType>) => {
      Object.entries(fields).forEach(([key, value]) => {
        setValue(key as keyof FormDataType, value ?? "");
      });
    },
    [setValue]
  );

  const cargarDepartamentos = useCallback(
    async (paisId: string) => {
      if (!paisId) {
        setDepartamentos([]);
        setCiudades([]);
        updateFields({
          paisNacimiento: "",
          departamentoNacimiento: "",
          municipioNacimiento: "",
        });
        return;
      }
      updateField("paisNacimiento", paisId);
      updateField("departamentoNacimiento", "");
      updateField("municipioNacimiento", "");

      try {
        const response = await api.get(`/ubicacion/departamentos/${paisId}`);
        setDepartamentos(response.data);
        setCiudades([]);
      } catch (error) {
        console.error("Error al cargar departamentos:", error);
      }
    },
    [updateField, updateFields]
  );

  const cargarCiudades = useCallback(
    async (departamentoId: string) => {
      updateField("departamentoNacimiento", departamentoId);
      updateField("municipioNacimiento", "");

      try {
        const response = await api.get(`/ubicacion/ciudades/${departamentoId}`);
        setCiudades(response.data);
      } catch (error) {
        console.error("Error al cargar ciudades:", error);
      }
    },
    [updateField]
  );

  const getFieldsByStep = (step: number): (keyof FormDataType)[] => {
    switch (step) {
      case 0:
        return ["fechaMatricula"];
      case 1:
        return [
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
        ];
      case 2:
        return ["tipoSangre", "epsAfiliado", "ipsAsignada", "estrato"];
      case 3:
        return ["discapacidadesNoAplica", "capacidadesExcepcionalesNoAplica"];
      case 4:
        return [
          // Nuevo paso para situación académica
          "situacionAcademicaNoEstudioVigenciaAnterior",
          "situacionAcademicaAprobo",
          "situacionAcademicaReprobo",
        ];
      case 5:
        return [
          "documentacionRecibidaRegistroCivil",
          "documentacionRecibidaCertificadosEstudios",
          "documentacionRecibidaFotos",
        ];
      case 6:
        return ["acudientes"];
      case 7:
        return [
          "tipoIdentificacionPadre",
          "primerNombrePadre",
          "primerApellidoPadre",
        ];
      case 8:
        return [
          "tipoIdentificacionMadre",
          "primerNombreMadre",
          "primerApellidoMadre",
        ];
      case 9:
        return ["autorizacionContactoEmergencia"];
      case 10:
        return ["autorizacionImagen", "veracidadInformacion"];
      default:
        return [];
    }
  };

  const handleNext = async () => {
    const fields = getFieldsByStep(activeStep);
    const isValid = await methods.trigger(fields);
    if (isValid) setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const onSubmit = async (data: FormDataType) => {
    setIsSubmitting(true);
    try {
      await api.post("/alumnos", data);
      enqueueSnackbar("Estudiante registrado con éxito", {
        variant: "success",
      });
      reset(initialFormData);
      setActiveStep(0);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Error desconocido";
      enqueueSnackbar(msg, { variant: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Renderiza el contenido de cada paso ---
  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <EnrollmentInfoForm />;
      case 1:
        return (
          <StudentInfoForm
            generos={generos}
            departamentos={departamentos}
            ciudades={ciudades}
            cargarDepartamentos={cargarDepartamentos}
            cargarCiudades={cargarCiudades}
            grados={grados}
            jornadaEscolar={jornadaEscolar}
            paises={paises}
            tiposIdentificacion={tiposIdentificacion}
            sedes={sedes}
          />
        );
      case 2:
        return (
          <HealthAffiliationForm
            updateField={updateField}
            estratoEconomico={estratosEconomico}
          />
        );
      case 3:
        return (
          <CondicionesEspeciales
            formData={formData}
            handleChange={(e) =>
              updateField(
                e.target.name as keyof FormDataType,
                String(e.target.value)
              )
            }
            siNo={siNo.map((opt) => opt.nombre)}
          />
        );
      case 4:
        return (
          <SituacionAcademica
            formData={formData}
            handleChange={(e) =>
              updateField(
                e.target.name as keyof FormDataType,
                String(e.target.value)
              )
            }
            siNo={siNo}
          />
        );
      case 5:
        return <DocumentacionRecibida siNo={siNo} />;
      case 6:
        return <AcudientesForm tiposAcudiente={tiposAcudiente} />;
      case 7:
        return (
          <ParentForm title="Padre" tiposIdentificacion={tiposIdentificacion} />
        );
      case 8:
        return (
          <ParentForm title="Madre" tiposIdentificacion={tiposIdentificacion} />
        );
      case 9:
        return (
          <Box>
            <CustomAutocomplete<FormDataType, OpcionSelect>
              label="Autorización para contacto de emergencia *"
              name="autorizacionContactoEmergencia"
              options={siNo}
              control={control}
              getOptionLabel={(option) => option.nombre}
              rules={{ required: "Este campo es obligatorio" }}
            />
            {formData.autorizacionContactoEmergencia === "SI" && (
              <Box sx={{ mt: 4 }}>
                <EmergencyContactForm />
              </Box>
            )}
          </Box>
        );
      case 10:
        return (
          <Box>
            <CustomAutocomplete<FormDataType, OpcionSelect>
              label="Autorizo uso de imagen *"
              name="autorizacionImagen"
              options={siNo}
              control={control}
              getOptionLabel={(option) => option.nombre}
              rules={{ required: "Este campo es obligatorio" }}
            />
            <Box sx={{ mt: 3 }}>
              <CustomAutocomplete<FormDataType, OpcionSelect>
                label="Veracidad de la información *"
                name="veracidadInformacion"
                options={siNo}
                control={control}
                getOptionLabel={(option) => option.nombre}
                rules={{ required: "Este campo es obligatorio" }}
              />
            </Box>
            <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
              * Todos los campos son obligatorios
            </Typography>
          </Box>
        );
      default:
        return null;
    }
  };

  // --- Autoguardado y recuperación ---
  useEffect(() => {
    const subscription = methods.watch((value) => {
      if (value) {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(value));
      }
    });
    return () => subscription.unsubscribe();
  }, [methods]);

  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) methods.reset(JSON.parse(stored));
  }, []);

  // --- Scroll automático en cambio de paso ---
  useEffect(() => {
    if (containerRef.current)
      containerRef.current.scrollIntoView({ behavior: "smooth" });
  }, [activeStep]);

  // --- Prevención de cierre accidental ---
  useEffect(() => {
    const handler = (event: BeforeUnloadEvent) => {
      if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
        event.preventDefault();
        event.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  // --- Barra de progreso y contador animado ---
  // Se muestra encima del Stepper
  const ProgressBar = () => (
    <Box sx={{ position: "relative", width: "100%", mb: 4 }}>
      <LinearProgress
        variant="determinate"
        value={progressPercentage}
        sx={{
          height: 10,
          borderRadius: 5,
          [`& .MuiLinearProgress-bar`]: {
            borderRadius: 5,
            backgroundColor: "primary.main",
          },
        }}
      />
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          position: "absolute",
          top: "-24px",
          right: 0,
          fontWeight: "bold",
        }}
      >
        {`${Math.round(progressPercentage)}% completado`}
      </Typography>
    </Box>
  );

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress size={50} />
      </Box>
    );
  }

  return (
    <FormProvider {...methods}>
      <Paper
        ref={containerRef}
        elevation={6}
        sx={{
          p: { xs: 2, md: 4 },
          maxWidth: "1000px",
          mx: "auto",
          mt: 4,
          borderRadius: 4,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
          Registro de Estudiante
        </Typography>

        {/* Barra de Progreso y Contador */}
        <ProgressBar />

        {/* Stepper */}
        <Box sx={{ width: "100%", overflowX: "auto", mb: 4, py: 1 }}>
          <Stepper
            activeStep={activeStep}
            orientation={isMobile ? "vertical" : "horizontal"}
            alternativeLabel={!isMobile}
            sx={{
              minWidth: "max-content",
              px: 2,
              "& .MuiStepLabel-root": {
                px: 1,
              },
            }}
          >
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  StepIconComponent={(props) => (
                    <CustomStepIcon
                      active={props.active || false}
                      completed={props.completed || false}
                    />
                  )}
                  sx={{
                    minWidth: "fit-content",
                    "& .MuiStepLabel-label": {
                      fontSize: "0.8rem",
                      fontWeight: activeStep === index ? "bold" : "normal",
                      color:
                        activeStep === index
                          ? "primary.main"
                          : "text.secondary",
                    },
                  }}
                >
                  {isMobile ? label.split(" ")[0] : label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
            >
              {renderStepContent(activeStep)}
            </motion.div>
          </AnimatePresence>

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
              color="secondary"
            >
              Atrás
            </Button>

            {activeStep === steps.length - 1 ? (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    Registrando...
                    <CircularProgress
                      size={20}
                      color="inherit"
                      sx={{ ml: 1 }}
                    />
                  </>
                ) : (
                  "Registrar Estudiante"
                )}
              </Button>
            ) : (
              <Button onClick={handleNext} variant="contained" color="primary">
                Siguiente
              </Button>
            )}
          </Box>
        </form>

        {/* Botón Limpiar Formulario */}
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Button
            variant="text"
            color="error"
            onClick={() => {
              reset(initialFormData);
              localStorage.removeItem(LOCAL_STORAGE_KEY);
              setActiveStep(0);
              enqueueSnackbar("Formulario reseteado", { variant: "info" });
            }}
          >
            Limpiar todo
          </Button>
        </Box>
      </Paper>
    </FormProvider>
  );
};

export default CreateStudentForm;
