// src/components/CreateStudentForm.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { useSnackbar } from "notistack";
import api from "../axios/axiosClient";
import { useFormState } from "../hooks/useFormState";
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
import { FormDataType, FormField } from "../types/formTypes";
import initialFormData from "../estudiantes/initialFormData";

const siNo: OpcionSelect[] = [
  { id: "SI", nombre: "SI" },
  { id: "NO", nombre: "NO" },
];

const CreateStudentForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { formData, updateField, updateFields } = useFormState();
  const [generos, setGeneros] = useState<OpcionSelect[]>([]);
  const [departamentos, setDepartamentos] = useState<OpcionSelect[]>([]);
  const [ciudades, setCiudades] = useState<OpcionSelect[]>([]);
  const [paises, setPaises] = useState<OpcionSelect[]>([]);
  const [grados, setGrados] = useState<OpcionSelect[]>([]);
  const [tiposIdentificacion, setTiposIdentificacion] = useState<OpcionSelect[]>([]);
  const jornadaEscolar = ["Mañana", "Tarde", "Completa"];

  // Cargar géneros
  useEffect(() => {
    const fetchGeneros = async () => {
      try {
        const response = await api.get("/generos");
        setGeneros(response.data);
      } catch (error) {
        console.error("Error al obtener géneros:", error);
      }
    };
    fetchGeneros();
  }, []);

  // Funciones optimizadas con useCallback
  const cargarDepartamentos = useCallback(async (paisId: string) => {
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
  }, [updateField, updateFields]);

  const cargarCiudades = useCallback(async (departamentoId: string) => {
    updateField("departamentoNacimiento", departamentoId);
    updateField("municipioNacimiento", "");

    try {
      const response = await api.get(`/ubicacion/ciudades/${departamentoId}`);
      setCiudades(response.data);
    } catch (error) {
      console.error("Error al cargar ciudades:", error);
    }
  }, [updateField]);

  const handleAutocompleteChange = useCallback((fieldName: FormField) => (
    _: React.SyntheticEvent,
    value: OpcionSelect | null
  ) => {
    updateField(fieldName, value ? value.id : "");
  }, [updateField]);

  const handleSubmit = useCallback(async () => {
    try {
      await api.post("/alumnos", formData);
      enqueueSnackbar("Estudiante registrado con éxito", {
        variant: "success",
      });
      updateFields(initialFormData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        enqueueSnackbar(error.message || "Error al registrar el estudiante", {
          variant: "error",
        });
      } else {
        enqueueSnackbar("Error desconocido", { variant: "error" });
      }
    }
  }, [formData, enqueueSnackbar, updateFields]);

  return (
    <Box sx={{
      maxWidth: "100%",
      margin: "auto",
      mt: 4,
      backgroundColor: "white",
      borderRadius: 2,
      boxShadow: 3,
    }}>
      <Typography variant="h4" align="center" sx={{ fontWeight: "bold", mb: 3 }}>
        Registro de Estudiante
      </Typography>

      <EnrollmentInfoForm formData={formData} updateField={updateField} />

      <StudentInfoForm
        formData={formData}
        updateField={updateField}
        generos={generos}
        departamentos={departamentos}
        ciudades={ciudades}
        cargarDepartamentos={cargarDepartamentos}
        cargarCiudades={cargarCiudades}
        grados={grados}
        jornadaEscolar={jornadaEscolar}
        paises={paises}
        tiposIdentificacion={tiposIdentificacion}
      />

      {/*<HealthAffiliationForm
        formData={formData}
        updateField={updateField}
      />

      <CondicionesEspeciales
        formData={formData}
        updateField={updateField}
      />

      <SituacionAcademica
        formData={formData}
        updateField={updateField}
      />

      <DocumentacionRecibida
        formData={formData}
        updateField={updateField}
      />

      <ParentForm
        formData={formData}
        updateField={updateField}
      />*/}

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        sx={{ mt: 3 }}
      >
        Registrar Estudiante
      </Button>
    </Box>
  );
};

export default CreateStudentForm;