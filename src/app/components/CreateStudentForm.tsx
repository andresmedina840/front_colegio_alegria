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

const CreateStudentForm = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState({
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
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await api.post("/alumnos", formData);
      enqueueSnackbar("Estudiante registrado con éxito", {
        variant: "success",
      });
      setFormData({
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
      });
    } catch (error) {
      enqueueSnackbar("Error al registrar el estudiante", { variant: "error" });
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

      <Card sx={{ p: 2, mb: 3, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="MATRICULA No."
                name="numeroMatricula"
                variant="outlined"
                value={formData.numeroMatricula}
                onChange={handleChange}
                helperText={`${formData.numeroMatricula.length} / 26 caracteres`}
                slotProps={{
                  htmlInput: {
                    maxLength: 26,
                  },
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                fullWidth
                label="Fecha de matrícula"
                name="fechaMatricula"
                value={formData.fechaMatricula}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                  htmlInput: {
                    max: new Date().toISOString().split("T")[0], // Fecha máxima es el día actual
                  },
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ p: 2, mb: 3, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography
            variant="h6"
            align="left"
            sx={{ fontWeight: "bold", mb: 3 }}
          >
            Información del estudiante
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Primer Nombre"
                name="primerNombre"
                variant="outlined"
                value={formData.primerNombre}
                onChange={handleChange}
                helperText={`${formData.primerNombre.length} / 26 caracteres`}
                slotProps={{
                  htmlInput: {
                    maxLength: 26,
                  },
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Segundo Nombre"
                name="segundoNombre"
                variant="outlined"
                value={formData.segundoNombre}
                onChange={handleChange}
                helperText={`${formData.segundoNombre.length} / 26 caracteres`}
                slotProps={{
                  htmlInput: {
                    maxLength: 26,
                  },
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Primer Apellido"
                name="primerApellido"
                variant="outlined"
                value={formData.primerApellido}
                onChange={handleChange}
                helperText={`${formData.primerApellido.length} / 26 caracteres`}
                slotProps={{
                  htmlInput: {
                    maxLength: 26,
                  },
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                fullWidth
                label="Segundo Apellido"
                name="segundoApellido"
                variant="outlined"
                value={formData.segundoApellido}
                onChange={handleChange}
                helperText={`${formData.segundoApellido.length} / 26 caracteres`}
                slotProps={{
                  htmlInput: {
                    maxLength: 26,
                  },
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="Sede para donde se matrícula"
                name="sedeMatricula"
                variant="outlined"
                value={formData.sedeMatricula}
                onChange={handleChange}
                helperText={`${formData.sedeMatricula.length} / 50 caracteres`}
                slotProps={{
                  htmlInput: {
                    maxLength: 50,
                  },
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Grado"
                name="grado"
                value={formData.grado}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              >
                {grados.map((grado) => (
                  <MenuItem key={grado} value={grado}>
                    {grado}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Jornada Escolar"
                name="jornada"
                value={formData.jornada}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              >
                {jornadaEscolar.map((jornada) => (
                  <MenuItem key={jornada} value={jornada}>
                    {jornada}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="Instución Educativa anterior (si aplica)"
                name="institucionEducativaAnterior"
                variant="outlined"
                value={formData.institucionEducativaAnterior}
                onChange={handleChange}
                helperText={`${formData.institucionEducativaAnterior.length} / 50 caracteres`}
                slotProps={{
                  htmlInput: {
                    maxLength: 50,
                  },
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Ultimo Grado Cursado"
                name="ultimoGradoCursado"
                value={formData.ultimoGradoCursado}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              >
                {grados.map((grado) => (
                  <MenuItem key={grado} value={grado}>
                    {grado}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Año del último grado cursado"
                name="ultimoAnioCursado"
                variant="outlined"
                value={formData.ultimoAnioCursado}
                onChange={handleChange}
                helperText={`${formData.ultimoAnioCursado.length} / 4 caracteres`}
                slotProps={{
                  htmlInput: {
                    maxLength: 4,
                  },
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                select
                fullWidth
                label="Género"
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              >
                {generos.map((gen) => (
                  <MenuItem key={gen} value={gen}>
                    {gen}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                type="date"
                fullWidth
                label="Fecha de Nacimiento"
                name="fechaNacimiento"
                value={formData.fechaNacimiento}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                  htmlInput: {
                    max: new Date().toISOString().split("T")[0], // Fecha máxima es el día actual
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Edad"
                name="edad"
                variant="outlined"
                value={formData.edad}
                onChange={handleChange}
                helperText={`${formData.edad.length} / 3 caracteres`}
                slotProps={{
                  htmlInput: {
                    maxLength: 3,
                  },
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Departamento de nacimiento"
                name="departamentoNacimiento"
                value={formData.departamentoNacimiento}
                onChange={handleChange}
                helperText={`${formData.departamentoNacimiento.length} / 60 caracteres`}
                slotProps={{
                  htmlInput: {
                    maxLength: 60,
                  },
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Municipio de nacimiento"
                name="municipioNacimiento"
                value={formData.municipioNacimiento}
                onChange={handleChange}
                helperText={`${formData.municipioNacimiento.length} / 60 caracteres`}
                slotProps={{
                  htmlInput: {
                    maxLength: 60,
                  },
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ p: 2, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography
            variant="h5"
            align="left"
            sx={{ fontWeight: "bold", mb: 3 }}
          >
            Afiliación al sistema de salud
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Tipo de Sangre y RH"
                name="tipoSangre"
                value={formData.tipoSangre}
                onChange={handleChange}
                helperText={`${formData.tipoSangre.length} / 5 caracteres`}
                slotProps={{
                  htmlInput: {
                    maxLength: 5,
                  },
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Eps Afiliado"
                name="epsAfiliado"
                value={formData.epsAfiliado}
                onChange={handleChange}
                helperText={`${formData.epsAfiliado.length} / 45 caracteres`}
                slotProps={{
                  htmlInput: {
                    maxLength: 45,
                  },
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="IPS Asignada"
                name="ipsAsignada"
                value={formData.ipsAsignada}
                onChange={handleChange}
                helperText={`${formData.ipsAsignada.length} / 55 caracteres`}
                slotProps={{
                  htmlInput: {
                    maxLength: 55,
                  },
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ARS Afiliado"
                name="arsAfiliado"
                value={formData.arsAfiliado}
                onChange={handleChange}
                helperText={`${formData.arsAfiliado.length} / 45 caracteres`}
                slotProps={{
                  htmlInput: {
                    maxLength: 45,
                  },
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card sx={{ p: 2, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Nro Carnet SISBEN"
                name="nroCarnetSisben"
                value={formData.nroCarnetSisben}
                onChange={handleChange}
                helperText={`${formData.nroCarnetSisben.length} / 20 caracteres`}
                slotProps={{
                  htmlInput: {
                    maxLength: 20,
                  },
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Nivel de SISBEN"
                name="nivelSisben"
                value={formData.nivelSisben}
                onChange={handleChange}
                helperText={`${formData.nivelSisben.length} / 45 caracteres`}
                slotProps={{
                  htmlInput: {
                    maxLength: 45,
                  },
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                label="Estrato"
                name="estrato"
                value={formData.estrato}
                onChange={handleChange}
                helperText={`${formData.estrato.length} / 3 caracteres`}
                slotProps={{
                  htmlInput: {
                    maxLength: 3,
                  },
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
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
