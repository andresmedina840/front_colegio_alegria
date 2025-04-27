"use client";

import { useState, useCallback } from "react";
import {
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  Divider,
  Paper,
  useTheme,
  useMediaQuery,
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

const siNo: OpcionSelect[] = [
  { id: "SI", nombre: "SI" },
  { id: "NO", nombre: "NO" },
];

const steps = [
  "Información de Matrícula",
  "Información del Estudiante",
  "Afiliación en Salud",
  "Condiciones Especiales y Académicas",
  "Documentación Recibida",
  "Acudientes",
  "Familia y Emergencia",
];

// Definimos el tipo para las props del ícono personalizado
interface CustomStepIconProps {
  active: boolean;
  completed: boolean;
}

const CustomStepIcon = ({ active, completed }: CustomStepIconProps) => {
  if (completed) return <CheckCircleIcon color="success" />;
  if (active) return <CircleIcon color="primary" />;
  return <RadioButtonUncheckedIcon color="disabled" />;
};

const CreateStudentForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useForm<FormDataType>({
    resolver: yupResolver(studentInfoSchema),
    defaultValues: initialFormData,
    mode: "onBlur",
  });

  const {
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
  } = methods;

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
        return [
          "discapacidadesNoAplica",
          "capacidadesExcepcionalesNoAplica",
          "situacionAcademicaNoEstudioVigenciaAnterior",
          "situacionAcademicaAprobo",
          "situacionAcademicaReprobo",
        ];
      case 4:
        return [
          "documentacionRecibidaRegistroCivil",
          "documentacionRecibidaCertificadosEstudios",
          "documentacionRecibidaFotos",
        ];
      case 5:
        return ["acudientes"];
      case 6:
        return [
          "tipoIdentificacionPadre",
          "primerNombrePadre",
          "primerApellidoPadre",
          "tipoIdentificacionMadre",
          "primerNombreMadre",
          "primerApellidoMadre",
          "autorizacionContactoEmergencia",
          "autorizacionImagen",
          "veracidadInformacion",
        ];
      default:
        return [];
    }
  };

  const handleNext = async () => {
    const fields = getFieldsByStep(activeStep);
    const isValid = await methods.trigger(fields);

    if (isValid) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const onSubmit = async (data: FormDataType) => {
    setIsSubmitting(true);
    try {
      await api.post("/alumnos", data);
      enqueueSnackbar("Estudiante registrado con éxito", { variant: "success" });
      reset(initialFormData);
      setActiveStep(0);
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : "Error desconocido";
      enqueueSnackbar(msg, { variant: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

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
        return <HealthAffiliationForm updateField={updateField} estratoEconomico={estratosEconomico} />;
      case 3:
        return (
          <>
            <CondicionesEspeciales
              formData={formData}
              handleChange={(e) => updateField(e.target.name as keyof FormDataType, String(e.target.value))}
              siNo={siNo.map((opt) => opt.nombre)}
            />
            <SituacionAcademica
              formData={formData}
              handleChange={(e) => updateField(e.target.name as keyof FormDataType, String(e.target.value))}
              siNo={siNo}
            />
          </>
        );
      case 4:
        return <DocumentacionRecibida siNo={siNo} />;
      case 5:
        return <AcudientesForm tiposAcudiente={tiposAcudiente} />;
      case 6:
        return (
          <>
            <ParentForm title="Padre" tiposIdentificacion={tiposIdentificacion} />
            <Divider sx={{ my: 4 }} />
            <ParentForm title="Madre" tiposIdentificacion={tiposIdentificacion} />
            <CustomAutocomplete<FormDataType, OpcionSelect>
              label="Autorización para contacto de emergencia"
              name="autorizacionContactoEmergencia"
              options={siNo}
              control={control}
              getOptionLabel={(option) => option.nombre}
            />
            {formData.autorizacionContactoEmergencia === "SI" && (
              <Box sx={{ mt: 2 }}>
                <EmergencyContactForm />
              </Box>
            )}
            <CustomAutocomplete<FormDataType, OpcionSelect>
              label="Autorizo uso de imagen"
              name="autorizacionImagen"
              options={siNo}
              control={control}
              getOptionLabel={(option) => option.nombre}
            />
            <CustomAutocomplete<FormDataType, OpcionSelect>
              label="Veracidad de la información"
              name="veracidadInformacion"
              options={siNo}
              control={control}
              getOptionLabel={(option) => option.nombre}
            />
          </>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
        <CircularProgress size={50} />
      </Box>
    );
  }

  return (
    <FormProvider {...methods}>
      <Paper
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

        <Stepper
          activeStep={activeStep}
          orientation={isMobile ? "vertical" : "horizontal"}
          alternativeLabel={!isMobile}
          sx={{ mb: 6 }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel 
                StepIconComponent={(props) => (
                  <CustomStepIcon 
                    active={props.active || false} 
                    completed={props.completed || false} 
                  />
                )}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

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
              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    Registrando...
                    <CircularProgress size={20} color="inherit" sx={{ ml: 1 }} />
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
      </Paper>
    </FormProvider>
  );
};

export default CreateStudentForm;