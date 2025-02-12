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
const grados = [
  "Pre-Jardín",
  "Jardín",
  "Transición",
  "Primero",
  "Segundo",
  "Tercero",
  "Cuarto",
  "Quinto",
];
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

  numeroIdentificacion: "",
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
  direccionPadre: "",
  barrioPadre: "",
  primerNombreMadre: "",
  segundoNombreMadre: "",
  primerApellidoMadre: "",
  segundoApellidoMadre: "",
  tipoIdentificacionPadre: "",
  numeroIdentificacionPadre: "",
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
  const [paises, setPaises] = useState<OpcionSelect[]>([]);
  const [departamentos, setDepartamentos] = useState<OpcionSelect[]>([]);
  const [ciudades, setCiudades] = useState<OpcionSelect[]>([]);

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
    if (!formData.paisNacimiento) {
      setDepartamentos([]); // Limpia los departamentos si no hay país seleccionado
      setCiudades([]); // Limpia las ciudades también
      return; // 🚀 No ejecuta la API si no hay un país seleccionado
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
  }, [formData.paisNacimiento]); // ✅ Solo ejecuta la API si paisNacimiento tiene un valor válido

  useEffect(() => {
    if (formData.departamentoNacimiento) {
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
    } else {
      setCiudades([]);
    }
  }, [formData.departamentoNacimiento]);

  const cargarDepartamentos = async (paisId: string) => {
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
      setCiudades([]); // Vaciar municipios
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

      <EnrollmentInfoForm formData={formData} handleChange={handleChange} />

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

      <HealthAffiliationForm
        formData={formData}
        handleChange={handleChange}
        estratoEconomico={estratoEconomico}
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
        siNo={siNo} // <- Agregar esta prop
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
            tiposIdentificacion={tiposIdentificacion.map((tipo) => tipo.nombre)}
          />

          <Box sx={{ mt: 2 }}>
            <ParentForm
              title="Madre"
              formData={formData}
              handleChange={handleChange}
              tiposIdentificacion={tiposIdentificacion.map(
                (tipo) => tipo.nombre
              )}
            />
          </Box>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={12}>
              <TextField
                select
                fullWidth
                label="Autorización para contacto de emergencia"
                name="autorizacionCoctactoEmergencia"
                value={formData.autorizacionCoctactoEmergencia || ""}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              >
                {siNo.map((respuestas) => (
                  <MenuItem key={respuestas} value={respuestas}>
                    {respuestas}
                  </MenuItem>
                ))}
              </TextField>
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
              <TextField
                select
                fullWidth
                label="Autorizo para uso de imagen (Fotografía/videos)"
                name="autorizacionImagen"
                value={formData.autorizacionImagen || ""}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              >
                {siNo.map((respuestas) => (
                  <MenuItem key={respuestas} value={respuestas}>
                    {respuestas}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Declaración de veracidad de la información"
                name="veracidadInformacion"
                value={formData.veracidadInformacion || ""}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              >
                {siNo.map((respuestas) => (
                  <MenuItem key={respuestas} value={respuestas}>
                    {respuestas}
                  </MenuItem>
                ))}
              </TextField>
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

      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleSubmit}
        >
          Registrar Estudiante
        </Button>
      </Grid>
    </Box>
  );
};

export default CreateStudentForm;
