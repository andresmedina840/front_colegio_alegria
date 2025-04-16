// src/app/components/StudentInfoForm.tsx
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
import { FormDataType, FormField } from "../types/formTypes";

type OpcionSelect = {
  id: string;
  nombre: string;
};

type StudentInfoFormProps = {
  formData: FormDataType;
  updateField: (field: FormField, value: string) => void;
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
  updateField,
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

  const calcularEdad = (fechaNacimiento: string): string => {
    if (!fechaNacimiento) return "";

    try {
      const nacimiento = dayjs(fechaNacimiento);
      const ahora = dayjs();

      // Validamos que la fecha sea válida y no sea futura
      if (!nacimiento.isValid() || nacimiento.isAfter(ahora)) {
        return "";
      }

      return ahora.diff(nacimiento, "year").toString();
    } catch (error) {
      console.error("Error calculando edad:", error);
      return "";
    }
  };

  const handleAutocompleteChange =
    (fieldName: FormField) =>
    (_: React.SyntheticEvent, value: OpcionSelect | null) => {
      const newValue = value?.id || "";
      updateField(fieldName, newValue);

      if (fieldName === "gradoId" && newValue) {
        setLoadingPension(true);
        api
          .get(`/pensiones/by-grado/${newValue}`)
          .then((response) => {
            if (response.data.length > 0) {
              setPensionValue(response.data[0].valor);
              updateField("pensionId", response.data[0].id);
            }
          })
          .catch((error) => {
            enqueueSnackbar(error.message, { variant: "error" });
            setPensionValue("");
          })
          .finally(() => setLoadingPension(false));
      } else if (fieldName === "gradoId" && !newValue) {
        setPensionValue("");
        updateField("pensionId", "");
      }

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
    updateField("jornada", value?.id ?? "");
  };

  const handleDateChange = (value: string | null, name: FormField) => {
    // Actualizamos el campo de fecha directamente
    updateField(name, value || "");

    // Si es el campo de fecha de nacimiento, calculamos la edad automáticamente
    if (name === "fechaNacimiento") {
      updateField("edad", calcularEdad(value || ""));
    }
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
          <Grid size={{ xs: 12, md: 6 }}>
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
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField
              label="Número Identificación Estudiante"
              name="numeroIdentificacionEstudiante"
              required
              value={formData.numeroIdentificacionEstudiante || ""}
              updateField={updateField}
              maxLength={26}
              showCharCount={true}
            />
          </Grid>

          {/* Campos de Nombres y Apellidos */}
          {(
            [
              {
                field: "primerNombreEstudiante",
                label: "Primer Nombre Estudiante",
              },
              {
                field: "segundoNombreEstudiante",
                label: "Segundo Nombre Estudiante",
              },
              {
                field: "primerApellidoEstudiante",
                label: "Primer Apellido Estudiante",
              },
              {
                field: "segundoApellidoEstudiante",
                label: "Segundo Apellido Estudiante",
              },
            ] as const
          ).map(({ field, label }) => (
            <Grid size={{ xs: 12, sm: 2, md: 6 }} key={field}>
              <CustomTextField
                label={label}
                name={field}
                uppercase
                value={formData[field]}
                updateField={updateField}
                maxLength={26}
                showCharCount
              />
            </Grid>
          ))}

          {/* Campo Género */}
          <Grid size={{ xs: 12, sm: 2, md: 4 }}>
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
          <Grid size={{ xs: 12, sm: 2, md: 3 }}>
            <CustomDatePicker
              label="Fecha de Nacimiento"
              name="fechaNacimiento" // Prop name añadida
              value={formData.fechaNacimiento}
              onChange={handleDateChange} // Ahora recibe automáticamente name y value
              maxDate={maxDateActual}
            />
          </Grid>

          {/* Campo Edad (calculado) */}
          <Grid size={{ xs: 12, sm: 2, md: 2 }}>
            <CustomTextField
              label="Edad"
              name="edad"
              value={formData.edad}
              updateField={updateField}
              inputProps={{
                readOnly: true,
                spellCheck: false,
                "data-ms-editor": "false",
              }}
            />
          </Grid>

          {/* Campo País de Nacimiento */}
          <Grid size={{ xs: 12, sm: 2, md: 3 }}>
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
          <Grid size={{ xs: 12, sm: 2, md: 6 }}>
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
          <Grid size={{ xs: 12, sm: 2, md: 6 }}>
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

          {/* Campo Sede */}
          <Grid size={{ xs: 12, sm: 2, md: 6 }}>
            <CustomTextField
              label="Sede para donde se matrícula"
              name="sedeMatricula"
              uppercase
              value={formData.sedeMatricula}
              updateField={updateField}
              maxLength={26}
              showCharCount
            />
          </Grid>

          {/* Campo Grado */}
          <Grid size={{ xs: 12, sm: 2, md: 3 }}>
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
          <Grid size={{ xs: 12, sm: 2, md: 3 }}>
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
          <Grid size={{ xs: 12, sm: 2, md: 7 }}>
            <CustomTextField
              label="Institución Educativa anterior (si aplica)"
              name="institucionEducativaAnterior"
              uppercase
              value={formData.institucionEducativaAnterior}
              updateField={updateField}
              maxLength={26}
              showCharCount
            />
          </Grid>

          {/* Campo Último Grado Cursado */}
          <Grid size={{ xs: 12, sm: 2, md: 3 }}>
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
          <Grid size={{ xs: 12, sm: 2, md: 2 }}>
            <CustomTextField
              label="Año del último grado cursado"
              name="ultimoAnioCursado"
              value={formData.ultimoAnioCursado}
              updateField={updateField}
              helperText={`${formData.ultimoAnioCursado.length} / 4 caracteres`}
              inputProps={{
                maxLength: 4,
                spellCheck: false,
                "data-ms-editor": "false",
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StudentInfoForm;
