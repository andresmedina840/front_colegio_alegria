// src/app/components/StudentInfoForm.tsx
"use client";

import {
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomTextField from "./personalizados/CustomTextField";
import CustomDatePicker from "./personalizados/CustomDatePicker";
import { getCurrentDayjsUTC } from "./../utils/dateUtils";
import dayjs from "dayjs";
import CustomAutocomplete from "./personalizados/CustomAutocomplete";
import { useSnackbar } from "notistack";
import api from "../axios/axiosClient";
import { FormDataType } from "../types/formTypes";
import { useFormContext } from "react-hook-form";

type OpcionSelect = {
  id: string;
  nombre: string;
};

type AutocompleteFields =
  | "tipoIdentificacionEstudianteId"
  | "generoEstudianteId"
  | "paisNacimiento"
  | "departamentoNacimiento"
  | "municipioNacimiento"
  | "gradoId"
  | "ultimoGradoCursado";

type StudentInfoFormProps = {
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
  const maxDateActual = getCurrentDayjsUTC();
  const [isMounted, setIsMounted] = useState(false);
  const [pensionValue, setPensionValue] = useState("");
  const [loadingPension, setLoadingPension] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<FormDataType>();

  const formData = watch();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const calcularEdad = (fechaNacimiento: string): string => {
      if (!fechaNacimiento) return "";
      const nacimiento = dayjs(fechaNacimiento);
      const ahora = dayjs();
      return nacimiento.isValid() && nacimiento.isBefore(ahora)
        ? ahora.diff(nacimiento, "year").toString()
        : "";
    };

    if (formData.fechaNacimiento) {
      setValue("edad", calcularEdad(formData.fechaNacimiento));
    }
  }, [formData.fechaNacimiento, setValue]);

  if (!isMounted) return null;

  const handleAutocompleteChange =
    (fieldName: AutocompleteFields) =>
    (_: React.SyntheticEvent, value: OpcionSelect | null) => {
      const newValue = value?.id || "";
      setValue(fieldName, newValue);

      if (fieldName === "gradoId" && newValue) {
        setLoadingPension(true);
        api
          .get(`/pensiones/by-grado/${newValue}`)
          .then((response) => {
            if (response.data.length > 0) {
              setPensionValue(response.data[0].valor);
              setValue("pensionId", response.data[0].id);
            }
          })
          .catch((error) => {
            enqueueSnackbar(error.message, { variant: "error" });
            setPensionValue("");
          })
          .finally(() => setLoadingPension(false));
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
    setValue("jornada", value?.id ?? "");
  };

  return (
    <Card sx={{ p: 2, mb: 3, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" align="left" sx={{ fontWeight: "bold", mb: 3 }}>
          Información del estudiante
        </Typography>
        <Grid container spacing={2}>

          {/* Tipo Identificación */}
          <Grid size={{ xs: 12, sm: 2, md: 6 }}>
            <CustomAutocomplete
              label="Tipo Identificación Estudiante *"
              name="tipoIdentificacionEstudianteId"
              options={tiposIdentificacion}
              value={tiposIdentificacion.find(
                (tipo) => tipo.id === formData.tipoIdentificacionEstudianteId
              ) || null}
              onChange={handleAutocompleteChange("tipoIdentificacionEstudianteId")}
              getOptionLabel={(option) => option.nombre}
              error={!!errors.tipoIdentificacionEstudianteId}
              helperText={errors.tipoIdentificacionEstudianteId?.message}
            />
          </Grid>

          {/* Número Identificación */}
          <Grid size={{ xs: 12, sm: 2, md: 6 }}>
            <CustomTextField
              label="Número Identificación Estudiante *"
              name="numeroIdentificacionEstudiante"
              maxLength={11}
              showCharCount
            />
          </Grid>

          {/* Nombres y Apellidos */}
          {([
            { field: "primerNombreEstudiante", label: "Primer Nombre Estudiante *" },
            { field: "segundoNombreEstudiante", label: "Segundo Nombre Estudiante" },
            { field: "primerApellidoEstudiante", label: "Primer Apellido Estudiante *" },
            { field: "segundoApellidoEstudiante", label: "Segundo Apellido Estudiante" },
          ] as const).map(({ field, label }) => (
            <Grid size={{ xs: 12, sm: 6, md: 6 }} key={field}>
              <CustomTextField
                label={label}
                name={field}
                maxLength={26}
                showCharCount
                uppercase
              />
            </Grid>
          ))}

          {/* Género */}
          <Grid size={{ xs: 12, sm: 4, md: 4 }}>
            <CustomAutocomplete
              label="Género *"
              name="generoEstudianteId"
              required
              options={generos}
              value={generos.find((g) => g.id === formData.generoEstudianteId) || null}
              onChange={handleAutocompleteChange("generoEstudianteId")}
              getOptionLabel={(option) => option.nombre}
              error={!!errors.generoEstudianteId}
              helperText={errors.generoEstudianteId?.message}
            />
          </Grid>

          {/* Fecha de nacimiento */}
          <Grid size={{ xs: 12, sm: 3, md: 3 }}>
            <CustomDatePicker
              label="Fecha de Nacimiento *"
              name="fechaNacimiento"
              maxDate={maxDateActual}
              helperText={errors.fechaNacimiento?.message}
            />
          </Grid>

          {/* Edad */}
          <Grid size={{ xs: 12, sm: 2, md: 2 }}>
            <CustomTextField label="Edad" name="edad" />
          </Grid>

          {/* País, Departamento y Municipio */}
          <Grid size={{ xs: 12, sm: 3, md: 3 }}>
            <CustomAutocomplete
              label="País de Nacimiento *"
              name="paisNacimiento"
              options={paises}
              value={paises.find((p) => p.id === formData.paisNacimiento) || null}
              onChange={handleAutocompleteChange("paisNacimiento")}
              getOptionLabel={(option) => option.nombre}
              error={!!errors.paisNacimiento}
              helperText={errors.paisNacimiento?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <CustomAutocomplete
              label="Departamento de Nacimiento *"
              name="departamentoNacimiento"
              options={departamentos}
              value={departamentos.find((d) => d.id === formData.departamentoNacimiento) || null}
              onChange={handleAutocompleteChange("departamentoNacimiento")}
              getOptionLabel={(option) => option.nombre}
              disabled={!formData.paisNacimiento}
              error={!!errors.departamentoNacimiento}
              helperText={errors.departamentoNacimiento?.message}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <CustomAutocomplete
              label="Municipio de Nacimiento *"
              name="municipioNacimiento"
              options={ciudades}
              value={ciudades.find((c) => c.id === formData.municipioNacimiento) || null}
              onChange={handleAutocompleteChange("municipioNacimiento")}
              getOptionLabel={(option) => option.nombre}
              disabled={!formData.departamentoNacimiento}
              error={!!errors.municipioNacimiento}
              helperText={errors.municipioNacimiento?.message}
            />
          </Grid>

          {/* Sede */}
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <CustomTextField
              label="Sede para donde se matrícula"
              name="sedeMatricula"
              maxLength={26}
              showCharCount
              uppercase
            />
          </Grid>

          {/* Grado a matricular */}
          <Grid size={{ xs: 12, sm: 3, md: 3 }}>
            <CustomAutocomplete
              label="Grado a matricular *"
              name="gradoId"
              options={grados}
              value={grados.find((g) => g.id === String(formData.gradoId)) || null}
              onChange={handleAutocompleteChange("gradoId")}
              getOptionLabel={(option) => option.nombre}
              error={!!errors.gradoId}
              helperText={errors.gradoId?.message}
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

          {/* Jornada Escolar */}
          <Grid size={{ xs: 12, sm: 3, md: 3 }}>
            <CustomAutocomplete
              label="Jornada Escolar *"
              name="jornada"
              options={jornadaEscolar.map((j) => ({ id: j, nombre: j }))}
              value={
                jornadaEscolar
                  .map((j) => ({ id: j, nombre: j }))
                  .find((opt) => opt.id === formData.jornada) || null
              }
              onChange={handleJornadaChange}
              getOptionLabel={(option) => option.nombre}
              error={!!errors.jornada}
              helperText={errors.jornada?.message}
            />
          </Grid>

          {/* Institución anterior */}
          <Grid size={{ xs: 12, sm: 7, md: 7 }}>
            <CustomTextField
              label="Institución Educativa anterior (si aplica)"
              name="institucionEducativaAnterior"
              maxLength={26}
              showCharCount
              uppercase
            />
          </Grid>

          {/* Último grado cursado */}
          <Grid size={{ xs: 12, sm: 3, md: 3 }}>
            <CustomAutocomplete
              label="Último Grado Cursado"
              name="ultimoGradoCursado"
              options={grados}
              value={grados.find((g) => g.id === formData.ultimoGradoCursado) || null}
              onChange={handleAutocompleteChange("ultimoGradoCursado")}
              getOptionLabel={(option) => option.nombre}
            />
          </Grid>

          {/* Año último grado */}
          <Grid size={{ xs: 12, sm: 2, md: 2 }}>
            <CustomTextField
              label="Año del último grado cursado"
              name="ultimoAnioCursado"
              maxLength={4}
              showCharCount
            />
          </Grid>

        </Grid>
      </CardContent>
    </Card>
  );
};

export default StudentInfoForm;
