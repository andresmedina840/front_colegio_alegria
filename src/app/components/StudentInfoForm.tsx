"use client";

import { Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTextField from "./personalizados/CustomTextField";
import CustomDatePicker from "./personalizados/CustomDatePicker";
import { getCurrentDateISO } from "./../utils/dateUtils";
import dayjs from "dayjs";
import CustomAutocomplete from "./personalizados/CustomAutocomplete";
import { useSnackbar } from "notistack";
import api from "../axios/axiosClient";

type OpcionSelect = {
  id: string;
  nombre: string;
};

type StudentInfoFormProps = {
  formData: Record<string, string>;
  handleChange: (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => void;
  grados: OpcionSelect[];
  jornadaEscolar: string[];
  generos: OpcionSelect[];
  paises: OpcionSelect[];
  departamentos: OpcionSelect[];
  ciudades: OpcionSelect[];
  cargarDepartamentos: (paisId: string) => void;
  cargarCiudades: (departamentoId: string) => void;
  tiposIdentificacion: OpcionSelect[];
};

const StudentInfoForm: React.FC<StudentInfoFormProps> = ({
  formData,
  handleChange,
  grados,
  jornadaEscolar,
  generos,
  paises,
  departamentos,
  ciudades,
  cargarDepartamentos,
  cargarCiudades,
  tiposIdentificacion,
}) => {
  const maxDateActual = getCurrentDateISO();
  const [isMounted, setIsMounted] = useState(false);
  const [pensionValue, setPensionValue] = useState("");
  const [loadingPension, setLoadingPension] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const commonTextFieldProps = {
    slotProps: {
      htmlInput: {
        suppressHydrationWarning: true,
        spellCheck: false,
        "data-ms-editor": "false",
      },
    },
  };

  const calcularEdad = (fechaNacimiento: string) => {
    if (!fechaNacimiento) return "";

    const nacimiento = dayjs(fechaNacimiento);
    const ahora = dayjs();

    return ahora.diff(nacimiento, "year").toString();
  };

  const handleAutocompleteChange =
    (fieldName: string) =>
    (_: React.SyntheticEvent, value: OpcionSelect | null) => {
      const newValue = value?.id || "";
      handleChange({
        target: {
          name: fieldName,
          value: newValue,
        },
      } as React.ChangeEvent<HTMLInputElement>);

      // Lógica específica para el campo gradoId
      if (fieldName === "gradoId" && newValue) {
        setLoadingPension(true);
        api
          .get(`/pensiones/by-grado/${newValue}`)
          .then((response) => {
            if (response.data.length > 0) {
              setPensionValue(response.data[0].valor);
              handleChange({
                target: {
                  name: "pensionId",
                  value: response.data[0].id,
                },
              } as React.ChangeEvent<HTMLInputElement>);
            }
          })
          .catch((error) => {
            enqueueSnackbar(error.message, { variant: "error" });
            setPensionValue("");
          })
          .finally(() => setLoadingPension(false));
      } else if (fieldName === "gradoId" && !newValue) {
        setPensionValue("");
        handleChange({
          target: { name: "pensionId", value: "" },
        } as React.ChangeEvent<HTMLInputElement>);
      }

      // Lógica específica para campos de ubicación
      if (fieldName === "paisNacimiento") {
        cargarDepartamentos(newValue);
      } else if (fieldName === "departamentoNacimiento") {
        cargarCiudades(newValue);
      }
    };

  const handleJornadaChange = (
    _: React.SyntheticEvent,
    value: OpcionSelect | null
  ) => {
    handleChange({
      target: { name: "jornada", value: value?.id ?? "" },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
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
          {/* Campo Tipo Identificación */}
          <Grid item xs={12} sm={5}>
            <CustomAutocomplete
              label="Tipo Identificación Estudiante"
              name="tipoIdentificacionEstudianteId"
              options={tiposIdentificacion}
              required
              value={
                tiposIdentificacion.find(
                  (tipo) => tipo.id === formData.tipoIdentificacionEstudianteId
                ) || null
              }
              onChange={handleAutocompleteChange(
                "tipoIdentificacionEstudianteId"
              )}
              getOptionLabel={(option: OpcionSelect) => option.nombre}
            />
          </Grid>

          {/* Campo Número Identificación */}
          <Grid item xs={12} sm={4}>
            <CustomTextField
              label="Número Identificación Estudiante"
              name="numeroIdentificacionEstudiante"
              required
              value={formData.numeroIdentificacionEstudiante || ""}
              onChange={handleChange}
              helperText={`${
                (formData.numeroIdentificacionEstudiante || "").length
              } / 12 caracteres`}
              slotProps={{
                htmlInput: {
                  maxLength: 12,
                  ...commonTextFieldProps.slotProps.htmlInput,
                },
              }}
            />
          </Grid>

          {/* Campos de Nombres y Apellidos */}
          {[
            "primerNombreEstudiante",
            "segundoNombreEstudiante",
            "primerApellidoEstudiante",
            "segundoApellidoEstudiante",
          ].map((field, index) => (
            <Grid item xs={12} sm={index < 2 ? 3 : 4} key={field}>
              <CustomTextField
                label={field.replace(/([A-Z])/g, " $1").trim()}
                name={field}
                variant="outlined"
                uppercase
                value={formData[field] || ""}
                onChange={handleChange}
                helperText={`${(formData[field] || "").length} / 26 caracteres`}
                slotProps={{
                  htmlInput: {
                    maxLength: 26,
                    ...commonTextFieldProps.slotProps.htmlInput,
                  },
                }}
              />
            </Grid>
          ))}

          {/* Campo Sede */}
          <Grid item xs={12} sm={6}>
            <CustomTextField
              label="Sede para donde se matrícula"
              name="sedeMatricula"
              variant="outlined"
              uppercase
              value={formData.sedeMatricula || ""}
              onChange={handleChange}
              helperText={`${
                (formData.sedeMatricula || "").length
              } / 50 caracteres`}
              slotProps={{
                htmlInput: {
                  maxLength: 50,
                  ...commonTextFieldProps.slotProps.htmlInput,
                },
              }}
            />
          </Grid>

          {/* Campo Grado */}
          <Grid item xs={12} sm={3}>
            <CustomAutocomplete
              label="Grado a matricular"
              name="gradoId"
              required
              options={grados}
              value={
                grados.find((grado) => grado.id === formData.gradoId) || null
              }
              onChange={handleAutocompleteChange("gradoId")}
              getOptionLabel={(option: OpcionSelect) => option.nombre}
            />
            {loadingPension && (
              <Typography variant="body2">Cargando...</Typography>
            )}
            {pensionValue && !loadingPension && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Pensión: ${parseFloat(pensionValue).toLocaleString()}
              </Typography>
            )}
          </Grid>

          {/* Campo Jornada Escolar */}
          <Grid item xs={12} sm={3}>
            <CustomAutocomplete
              label="Jornada Escolar"
              options={jornadaEscolar.map((jornada) => ({
                id: jornada,
                nombre: jornada,
              }))}
              name="jornada"
              required
              value={
                jornadaEscolar
                  .map((jornada) => ({ id: jornada, nombre: jornada }))
                  .find((option) => option.id === formData.jornada) || null
              }
              onChange={handleJornadaChange}
              getOptionLabel={(option: OpcionSelect) => option.nombre}
            />
          </Grid>

          {/* Campo Institución Educativa Anterior */}
          <Grid item xs={12}>
            <CustomTextField
              label="Institución Educativa anterior (si aplica)"
              name="institucionEducativaAnterior"
              variant="outlined"
              uppercase
              value={formData.institucionEducativaAnterior || ""}
              onChange={handleChange}
              helperText={`${
                (formData.institucionEducativaAnterior || "").length
              } / 50 caracteres`}
              slotProps={{
                htmlInput: {
                  maxLength: 50,
                  ...commonTextFieldProps.slotProps.htmlInput,
                },
              }}
            />
          </Grid>

          {/* Campo Último Grado Cursado */}
          <Grid item xs={12} sm={3}>
            <CustomAutocomplete
              label="Último Grado Cursado"
              name="ultimoGradoCursado"
              options={grados}
              value={
                grados.find(
                  (grado) => grado.id === formData.ultimoGradoCursado
                ) || null
              }
              onChange={handleAutocompleteChange("ultimoGradoCursado")}
              getOptionLabel={(option: OpcionSelect) => option.nombre}
            />
          </Grid>

          {/* Campo Año Último Grado Cursado */}
          <Grid item xs={12} sm={3}>
            <CustomTextField
              label="Año del último grado cursado"
              name="ultimoAnioCursado"
              variant="outlined"
              value={formData.ultimoAnioCursado || ""}
              onChange={handleChange}
              helperText={`${
                (formData.ultimoAnioCursado || "").length
              } / 4 caracteres`}
              slotProps={{
                htmlInput: {
                  maxLength: 4,
                  ...commonTextFieldProps.slotProps.htmlInput,
                },
              }}
            />
          </Grid>

          {/* Campo Género */}
          <Grid item xs={12} sm={3}>
            <CustomAutocomplete
              label="Género"
              name="generoEstudianteId"
              options={generos}
              required
              value={
                generos.find((g) => g.id === formData.generoEstudianteId) ||
                null
              }
              onChange={handleAutocompleteChange("generoEstudianteId")}
              getOptionLabel={(option: OpcionSelect) => option.nombre}
            />
          </Grid>

          {/* Campo Fecha de Nacimiento */}
          <Grid item xs={12} sm={3}>
            <CustomDatePicker
              label="Fecha de Nacimiento"
              name="fechaNacimiento"
              value={formData.fechaNacimiento || ""}
              onChange={(value) => {
                handleChange({
                  target: {
                    name: "fechaNacimiento",
                    value: value || "",
                  },
                } as React.ChangeEvent<HTMLInputElement>);

                handleChange({
                  target: {
                    name: "edad",
                    value: calcularEdad(value || ""),
                  },
                } as React.ChangeEvent<HTMLInputElement>);
              }}
              maxDate={maxDateActual}
            />
          </Grid>

          {/* Campo Edad (calculado) */}
          <Grid item xs={12} sm={2}>
            <CustomTextField
              label="Edad"
              name="edad"
              variant="outlined"
              value={formData.edad || ""}
              slotProps={{
                input: { readOnly: true },
                htmlInput: commonTextFieldProps.slotProps.htmlInput,
              }}
            />
          </Grid>

          {/* Campo País de Nacimiento */}
          <Grid item xs={12} sm={4}>
            <CustomAutocomplete
              label="País de Nacimiento"
              name="paisNacimiento"
              required
              options={paises}
              value={
                paises.find((pais) => pais.id === formData.paisNacimiento) ||
                null
              }
              onChange={handleAutocompleteChange("paisNacimiento")}
              getOptionLabel={(option: OpcionSelect) => option.nombre}
            />
          </Grid>

          {/* Campo Departamento de Nacimiento */}
          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              label="Departamento de Nacimiento"
              name="departamentoNacimiento"
              required
              options={departamentos}
              value={
                departamentos.find(
                  (dep) => dep.id === formData.departamentoNacimiento
                ) || null
              }
              onChange={handleAutocompleteChange("departamentoNacimiento")}
              getOptionLabel={(option: OpcionSelect) => option.nombre}
              disabled={!formData.paisNacimiento}
            />
          </Grid>

          {/* Campo Municipio de Nacimiento */}
          <Grid item xs={12} sm={5}>
            <CustomAutocomplete
              label="Municipio de Nacimiento"
              name="municipioNacimiento"
              required
              options={ciudades}
              value={
                ciudades.find(
                  (ciudad) => ciudad.id === formData.municipioNacimiento
                ) || null
              }
              onChange={handleAutocompleteChange("municipioNacimiento")}
              getOptionLabel={(option: OpcionSelect) => option.nombre}
              disabled={!formData.departamentoNacimiento}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StudentInfoForm;
