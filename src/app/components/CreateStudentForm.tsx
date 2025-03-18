"use client";

import { useState, useEffect } from "react";
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
import CustomAutocomplete from "./personalizados/CustomAutocomplete";

const siNo = ["SI", "NO"];

// Definir el tipo para opciones select
type OpcionSelect = {
  id: string;
  nombre: string;
};

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
  const [generos, setGeneros] = useState<OpcionSelect[]>([]);

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
        generos={generos}
        paises={paises}
        departamentos={departamentos}
        ciudades={ciudades}
        cargarDepartamentos={cargarDepartamentos}
        cargarCiudades={cargarCiudades}
        tiposIdentificacion={tiposIdentificacion}
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

      <Card sx={{ p: 2, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography
            variant="h5"
            align="left"
            sx={{ fontWeight: "bold", mb: 3 }}
          >
            Información Familiar
          </Typography>

          <ParentForm
            title="Padre"
            formData={formData}
            handleChange={handleChange}
            tiposIdentificacion={tiposIdentificacion}
          />

          <Box sx={{ mt: 2 }}>
            <ParentForm
              title="Madre"
              formData={formData}
              handleChange={handleChange}
              tiposIdentificacion={tiposIdentificacion}
            />
          </Box>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={12}>
              <CustomAutocomplete
                label="Autorización para contacto de emergencia"
                name="autorizacionCoctactoEmergencia"
                options={siNo}
                value={formData.autorizacionCoctactoEmergencia || ""}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    autorizacionCoctactoEmergencia: value ?? "",
                  }))
                }
                getOptionLabel={(option) => option}
              />
            </Grid>

            {formData.autorizacionCoctactoEmergencia === "SI" && (
              <Box sx={{ mt: 2, ml: 2 }}>
                <EmergencyContactForm
                  formData={formData}
                  handleChange={handleChange}
                  tiposIdentificacion={tiposIdentificacion.map(
                    (tipo) => tipo.nombre
                  )}
                />
              </Box>
            )}

            <Grid item xs={12} sm={6}>
              <CustomAutocomplete
                label="Autorizo para uso de imagen (Fotografía/videos)"
                name="autorizacionImagen"
                options={siNo}
                value={formData.autorizacionImagen || ""}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    autorizacionImagen: value ?? "",
                  }))
                }
                getOptionLabel={(option) => option}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <CustomAutocomplete
                label="Declaración de veracidad de la información"
                name="veracidadInformacion"
                options={siNo}
                value={formData.veracidadInformacion || ""}
                onChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    veracidadInformacion: value ?? "",
                  }))
                }
                getOptionLabel={(option) => option}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Typography
                variant="h5"
                align="justify"
                sx={{ fontWeight: "bold", mb: 3 }}
              >
                Con mi firma y con la de mi padre, madre o acudiente, nos
                comprometemos a cumplir con lo establecido en el Manual de
                Convivencia del Colegio Alegria del Norte.
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

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
