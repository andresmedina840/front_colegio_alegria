"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  MenuItem,
  CardContent,
  Card,
} from "@mui/material";
import { useSnackbar } from "notistack";
import api from "../axios/axiosClient";
import ParentForm from "./ParentForm";
import HealthAffiliationForm from "./HealthAffiliationForm";
import StudentInfoForm from "./StudentInfoForm";
import EnrollmentInfoForm from "./EnrollmentInfoForm";
import EmergencyContactForm from "./EmergencyContactForm";
import DocumentacionRecibida from "./DocumentacionRecibida";
import SituacionAcademica from "./SituacionAcademica";
import CondicionesEspeciales from "./CondicionesEspeciales";

const generos = ["Masculino", "Femenino", "Otro"];

const jornadaEscolar = ["Mañana", "Tarde", "Completa"];
const siNo = [" ", "SI", "NO"];
const estratoEconomico = [
  "Estrato 1 ",
  "Estrato 2",
  "Estrato 3",
  "Estrato 4 ",
  "Estrato 5",
  "Estrato 6",
  "Otro",
];

type OpcionSelect = {
  id: string;
  nombre: string;
};

const initialFormData = {
  numeroMatricula: "",
  fechaMatricula: "",
  tipoIdentificacionEstudiante: "",
  numeroIdentificacionEstudiante: "",
  primerNombre: "",
  segundoNombre: "",
  primerApellido: "",
  segundoApellido: "",
  sedeMatricula: "",
  grado: "",
  jornada: "",
  institucionEducativaAnterior: "",
  ultimoGradoCursado: "",
  ultimoAnioCursado: "",
  genero: "",
  fechaNacimiento: "",
  edad: "",
  paisNacimiento: "",
  departamentoNacimiento: "",
  municipioNacimiento: "",

  tipoSangre: "",
  epsAfiliado: "",
  ipsAsignada: "",
  arsAfiliado: "",
  nroCarnetSisben: "",
  nivelSisben: "",
  estrato: "",

  primerNombrePadre: "",
  segundoNombrePadre: "",
  primerApellidoPadre: "",
  segundoApellidoPadre: "",
  tipoIdentificacionPadre: "",
  numeroIdentificacionPadre: "",
  direccionPadre: "",
  barrioPadre: "",
  primerNombreMadre: "",
  segundoNombreMadre: "",
  primerApellidoMadre: "",
  segundoApellidoMadre: "",
  tipoIdentificacionMadre: "",
  numeroIdentificacionMadre: "",
  numeroCelularPadre: "",
  ocupacionPadre: "",
  correoElectronicoPadre: "",
  autorizacionImagen: "",
  veracidadInformacion: "",
  autorizacionCoctactoEmergencia: "",
};

const CreateStudentForm = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState(initialFormData);

  const [tiposIdentificacion, setTiposIdentificacion] = useState<
    OpcionSelect[]
  >([]);
  const [grados, setGrados] = useState<OpcionSelect[]>([]);
  const [paises, setPaises] = useState<OpcionSelect[]>([]);
  const [departamentos, setDepartamentos] = useState<OpcionSelect[]>([]);
  const [ciudades, setCiudades] = useState<OpcionSelect[]>([]);

  useEffect(() => {
    const fetchGrados = async () => {
      try {
        const response = await api.get<OpcionSelect[]>("/grados/listaGrados");
        setGrados(response.data);
      } catch (error) {
        console.error("Error al cargar la lista de Grados: ", error);
      }
    };
    fetchGrados();
  }, []);

  useEffect(() => {
    const fetchTiposIdentificacion = async () => {
      try {
        const response = await api.get<OpcionSelect[]>(
          "/tipo-identificacion/tiposDeIdentificacion"
        );
        setTiposIdentificacion(response.data);
      } catch (error) {
        console.error("Error al cargar tipos de Identificación: ", error);
      }
    };
    fetchTiposIdentificacion();
  }, []);

  useEffect(() => {
    const fetchPaises = async () => {
      try {
        const response = await api.get<OpcionSelect[]>("/ubicacion/paises");
        setPaises(response.data);
      } catch (error) {
        console.error("Error al cargar países:", error);
      }
    };
    fetchPaises();
  }, []);

  useEffect(() => {
    if (!formData.paisNacimiento || formData.paisNacimiento === "") {
      setDepartamentos([]);
      setCiudades([]);
      return;
    }

    const fetchDepartamentos = async () => {
      try {
        const response = await api.get<OpcionSelect[]>(
          `/ubicacion/departamentos/${formData.paisNacimiento}`
        );
        setDepartamentos(response.data);
      } catch (error) {
        console.error("Error al cargar departamentos:", error);
      }
    };

    fetchDepartamentos();
  }, [formData.paisNacimiento]);

  useEffect(() => {
    if (
      !formData.departamentoNacimiento ||
      formData.departamentoNacimiento === ""
    ) {
      setCiudades([]);
      return;
    }

    const fetchCiudades = async () => {
      try {
        const response = await api.get<OpcionSelect[]>(
          `/ubicacion/ciudades/${formData.departamentoNacimiento}`
        );
        setCiudades(response.data);
      } catch (error) {
        console.error("Error al cargar ciudades:", error);
      }
    };

    fetchCiudades();
  }, [formData.departamentoNacimiento]);

  const cargarDepartamentos = async (paisId: string) => {
    if (!paisId || paisId === "") {
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
      const response = await api.get<OpcionSelect[]>(
        `/ubicacion/departamentos/${paisId}`
      );
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
      const response = await api.get<OpcionSelect[]>(
        `/ubicacion/ciudades/${departamentoId}`
      );
      setCiudades(response.data);
    } catch (error) {
      console.error("Error al cargar ciudades:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >
  ): void => {
    const { name, value } = e.target as { name: string; value: string }; // Cast para evitar errores

    if (name === "fechaNacimiento") {
      const hoy = new Date();
      const fechaNac = new Date(value);
      let edadCalculada = hoy.getFullYear() - fechaNac.getFullYear();

      // Ajustar si aún no ha cumplido años este año
      const mes = hoy.getMonth() - fechaNac.getMonth();
      if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
        edadCalculada--;
      }

      setFormData((prevData) => ({
        ...prevData,
        edad: edadCalculada.toString() + " años",
      }));
    }

    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await api.post("/alumnos", formData);
      enqueueSnackbar("Estudiante registrado con éxito", {
        variant: "success",
      });
      setFormData(initialFormData);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Error al registrar el estudiante";
      enqueueSnackbar(errorMessage, { variant: "error" });
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

      {/*<EnrollmentInfoForm formData={formData} handleChange={handleChange} />*/}

      <StudentInfoForm
        formData={formData}
        handleChange={handleChange}
        grados={grados}
        jornadaEscolar={jornadaEscolar}
        generos={generos}
        paises={paises}
        departamentos={departamentos}
        ciudades={ciudades}
        cargarDepartamentos={cargarDepartamentos}
        cargarCiudades={cargarCiudades}
        tiposIdentificacion={tiposIdentificacion.map((tipo) => tipo.nombre)}
      />
    </Box>
  );
};

export default CreateStudentForm;
