"use client";

import { useState } from "react";
import { Box, Typography, Button, Card, CardContent, TextField, Grid, MenuItem } from "@mui/material";
import { useSnackbar } from "notistack";
import api from "../axios/axiosClient";
import initialFormData from "../estudiantes/initialFormData";
import useFetchData from "../hooks/useFetchData";
import EnrollmentInfoForm from "./EnrollmentInfoForm";
import StudentInfoForm from "./StudentInfoForm";
import HealthAffiliationForm from "./HealthAffiliationForm";
import CondicionesEspeciales from "./CondicionesEspeciales";
import SituacionAcademica from "./SituacionAcademica";
import DocumentacionRecibida from "./DocumentacionRecibida";
import ParentForm from "./ParentForm";
import EmergencyContactForm from "./EmergencyContactForm";

const siNo = ["SI", "NO"];

const CreateStudentForm = () => {
  const { enqueueSnackbar } = useSnackbar();
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

  const [formData, setFormData] = useState(initialFormData);

  const cargarDepartamentos = async (paisId: string) => {
    if (!paisId) {
      setDepartamentos([]);
      setCiudades([]);
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      paisNacimiento: paisId,
      departamentoNacimiento: "",
      municipioNacimiento: "",
    }));

    try {
      const response = await api.get(`/ubicacion/departamentos/${paisId}`);
      setDepartamentos(response.data);
      setCiudades([]);
    } catch (error) {
      console.error("Error al cargar departamentos:", error);
    }
  };

  const cargarCiudades = async (departamentoId: string) => {
    setFormData((prevData) => ({
      ...prevData,
      departamentoNacimiento: departamentoId,
      municipioNacimiento: "",
    }));

    try {
      const response = await api.get(`/ubicacion/ciudades/${departamentoId}`);
      setCiudades(response.data);
    } catch (error) {
      console.error("Error al cargar ciudades:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    try {
      await api.post("/alumnos", formData);
      enqueueSnackbar("Estudiante registrado con éxito", {
        variant: "success",
      });
      setFormData(initialFormData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        enqueueSnackbar(error.message || "Error al registrar el estudiante", {
          variant: "error",
        });
      } else {
        enqueueSnackbar("Error desconocido", { variant: "error" });
      }
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "100%",
        margin: "auto",
        mt: 4,
        backgroundColor: "white",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: "bold", mb: 3 }}
      >
        Registro de Estudiante
      </Typography>

      <EnrollmentInfoForm formData={formData} handleChange={handleChange} />

      <StudentInfoForm
        formData={formData}
        handleChange={handleChange}
        grados={grados}
        jornadaEscolar={["Mañana", "Tarde", "Completa"]}
        generos={["Masculino", "Femenino", "Otro"]}
        paises={paises}
        departamentos={departamentos}
        ciudades={ciudades}
        cargarDepartamentos={cargarDepartamentos}
        cargarCiudades={cargarCiudades}
        tiposIdentificacion={tiposIdentificacion.map((tipo) => tipo.nombre)}
      />
      <HealthAffiliationForm
        formData={formData}
        handleChange={handleChange}
        estratoEconomico={estratoEconomico.map((tipo) => tipo.nombre)}
      />

      <CondicionesEspeciales
        formData={formData}
        handleChange={handleChange}
        siNo={siNo}
      />

      <SituacionAcademica
        formData={formData}
        handleChange={handleChange}
        siNo={siNo}
      />

      <DocumentacionRecibida
        formData={formData}
        handleChange={handleChange}
        siNo={siNo}
      />

      

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
