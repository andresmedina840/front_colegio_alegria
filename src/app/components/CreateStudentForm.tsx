"use client";

import { useState } from "react";
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
import api from "../services/api";
import ParentForm from "./ParentForm";
import HealthAffiliationForm from "./HealthAffiliationForm";
import StudentInfoForm from "./StudentInfoForm";
import EnrollmentInfoForm from "./EnrollmentInfoForm";

const generos = ["Masculino", "Femenino", "Otro"];
const tiposIdentificacion = ["TI", "CC", "RC", "CE"];
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
const siNo = ["SI", "NO"];

const initialFormData = {
  primerNombre: "",
  segundoNombre: "",
  primerApellido: "",
  segundoApellido: "",
  numeroIdentificacion: "",
  fechaNacimiento: "",
  fechaMatricula: "",
  genero: "",
  grado: "",
  jornada: "",
  departamentoNacimiento: "",
  municipioNacimiento: "",
  sedeMatricula: "",
  institucionEducativaAnterior: "",
  ultimoGradoCursado: "",
  ultimoAnioCursado: "",
  edad: "",
  tipoSangre: "",
  epsAfiliado: "",
  ipsAsignada: "",
  arsAfiliado: "",
  nroCarnetSisben: "",
  nivelSisben: "",
  estrato: "",
  numeroMatricula: "",
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
};

const CreateStudentForm = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

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
      />

      <HealthAffiliationForm formData={formData} handleChange={handleChange} />

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
