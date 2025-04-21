// src/app/components/StudentInfoForm.tsx
"use client";

import { Card, CardContent, Grid, Typography } from "@mui/material";
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

  const { setValue, watch, control } = useFormContext<FormDataType>();
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
        setValue("departamentoNacimiento", "");
        setValue("municipioNacimiento", "");
      } else if (fieldName === "departamentoNacimiento") {
        cargarCiudades(newValue);
        setValue("municipioNacimiento", "");
      }
    };

  const handleJornadaChange = (
    _: React.SyntheticEvent,
    value: OpcionSelect | null
  ) => {
    setValue("jornada", value?.id ?? "");
  };

  if (!isMounted) return null;

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
          {/* Tipo Identificación */}
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <CustomAutocomplete<FormDataType, OpcionSelect>
              label="Tipo Identificación Estudiante *"
              name="tipoIdentificacionEstudianteId"
              options={tiposIdentificacion}
              control={control}
              onChange={handleAutocompleteChange(
                "tipoIdentificacionEstudianteId"
              )}
              getOptionLabel={(option: OpcionSelect) => option.nombre}
              getOptionValue={(option) => option.id}
              rules={{ required: "Este campo es obligatorio" }}
            />
          </Grid>

          {/* Número Identificación */}
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <CustomTextField
              label="Número Identificación Estudiante *"
              name="numeroIdentificacionEstudiante"
              maxLength={11}
              showCharCount
              rules={{ required: "Este campo es obligatorio" }}
            />
          </Grid>

          {/* Nombres y Apellidos */}
          {(
            [
              {
                field: "primerNombreEstudiante",
                label: "Primer Nombre Estudiante *",
              },
              {
                field: "segundoNombreEstudiante",
                label: "Segundo Nombre Estudiante",
              },
              {
                field: "primerApellidoEstudiante",
                label: "Primer Apellido Estudiante *",
              },
              {
                field: "segundoApellidoEstudiante",
                label: "Segundo Apellido Estudiante",
              },
            ] as const
          ).map(({ field, label }) => (
            <Grid size={{ xs: 12, sm: 6, md: 6 }} key={field}>
              <CustomTextField
                label={label}
                name={field}
                maxLength={26}
                showCharCount
                uppercase
                rules={
                  label.includes("*")
                    ? { required: "Este campo es obligatorio" }
                    : undefined
                }
              />
            </Grid>
          ))}

          {/* Género */}
          <Grid size={{ xs: 12, sm: 4, md: 4 }}>
            <CustomAutocomplete<FormDataType, OpcionSelect>
              label="Género *"
              name="generoEstudianteId"
              options={generos}
              control={control}
              onChange={handleAutocompleteChange("generoEstudianteId")}
              getOptionLabel={(option: OpcionSelect) => option.nombre}
              getOptionValue={(option) => option.id}
              rules={{ required: "Este campo es obligatorio" }}
            />
          </Grid>

          {/* Fecha de nacimiento */}
          <Grid size={{ xs: 12, sm: 3, md: 3 }}>
            <CustomDatePicker
              label="Fecha de Nacimiento *"
              name="fechaNacimiento"
              maxDate={maxDateActual}
              rules={{ required: "Este campo es obligatorio" }}
            />
          </Grid>

          {/* Edad */}
          <Grid size={{ xs: 12, sm: 2, md: 2 }}>
            <CustomTextField label="Edad" name="edad" disabled />
          </Grid>

          {/* País, Departamento y Municipio */}
          <Grid size={{ xs: 12, sm: 3, md: 3 }}>
            <CustomAutocomplete<FormDataType, OpcionSelect>
              label="País de Nacimiento *"
              name="paisNacimiento"
              options={paises}
              control={control}
              onChange={handleAutocompleteChange("paisNacimiento")}
              getOptionLabel={(option: OpcionSelect) => option.nombre}
              getOptionValue={(option) => option.id}
              rules={{ required: "Este campo es obligatorio" }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <CustomAutocomplete<FormDataType, OpcionSelect>
              label="Departamento de Nacimiento *"
              name="departamentoNacimiento"
              options={departamentos}
              control={control}
              onChange={handleAutocompleteChange("departamentoNacimiento")}
              getOptionLabel={(option: OpcionSelect) => option.nombre}
              getOptionValue={(option) => option.id}
              disabled={!formData.paisNacimiento}
              rules={{ required: "Este campo es obligatorio" }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <CustomAutocomplete<FormDataType, OpcionSelect>
              label="Municipio de Nacimiento *"
              name="municipioNacimiento"
              options={ciudades}
              control={control}
              onChange={handleAutocompleteChange("municipioNacimiento")}
              getOptionLabel={(option: OpcionSelect) => option.nombre}
              getOptionValue={(option) => option.id}
              disabled={!formData.departamentoNacimiento}
              rules={{ required: "Este campo es obligatorio" }}
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
          <Grid size={{ xs: 12, sm: 6, md: 6 }}>
            <CustomAutocomplete<FormDataType, OpcionSelect>
              label="Grado a matricular *"
              name="gradoId"
              options={grados}
              control={control}
              onChange={handleAutocompleteChange("gradoId")}
              getOptionLabel={(option: OpcionSelect) => option.nombre}
              getOptionValue={(option) => option.id}
              rules={{ required: "Este campo es obligatorio" }}
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
            <CustomAutocomplete<FormDataType, OpcionSelect>
              label="Jornada Escolar *"
              name="jornada"
              options={jornadaEscolar.map((j) => ({ id: j, nombre: j }))}
              control={control}
              onChange={handleJornadaChange}
              getOptionLabel={(option: OpcionSelect) => option.nombre}
              getOptionValue={(option) => option.id}
              rules={{ required: "Este campo es obligatorio" }}
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
            <CustomAutocomplete<FormDataType, OpcionSelect>
              label="Último Grado Cursado"
              name="ultimoGradoCursado"
              options={grados}
              control={control}
              onChange={handleAutocompleteChange("ultimoGradoCursado")}
              getOptionLabel={(option: OpcionSelect) => option.nombre}
              getOptionValue={(option) => option.id}
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
