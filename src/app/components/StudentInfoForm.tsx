"use client";

import { Card, CardContent, Grid, TextField, Typography } from "@mui/material";
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
  | "sedeMatricula"
  | "gradoId"
  | "ultimoGradoCursado";

type StudentInfoFormProps = {
  grados: OpcionSelect[];
  jornadaEscolar: string[];
  generos: OpcionSelect[];
  paises: OpcionSelect[];
  departamentos: OpcionSelect[];
  ciudades: OpcionSelect[];
  cargarDepartamentos: (paisId: string) => Promise<void>;
  cargarCiudades: (departamentoId: string) => Promise<void>;
  tiposIdentificacion: OpcionSelect[];
  sedes: OpcionSelect[];
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
  sedes,
}) => {
  const maxDateActual = getCurrentDayjsUTC();
  const [isMounted, setIsMounted] = useState(false);
  const [pensionValue, setPensionValue] = useState("");
  const [loadingPension, setLoadingPension] = useState(false);
  const [loadingDepartamentos, setLoadingDepartamentos] = useState(false);
  const [loadingCiudades, setLoadingCiudades] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const { setValue, watch, control } = useFormContext<FormDataType>();
  const formData = watch();

  // Nuevo: grados filtrados según gradoId
  const [gradosFiltrados, setGradosFiltrados] =
    useState<OpcionSelect[]>(grados);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (sedes.length === 1) {
      setValue("sedeMatricula", sedes[0].id);
    }
  }, [sedes, setValue]);

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

  // Nuevo: filtrar grados para "Último Grado Cursado"
  useEffect(() => {
    if (!formData.gradoId) {
      setGradosFiltrados(grados);
      return;
    }

    // Buscar el índice real por ID
    const indexSeleccionado = grados.findIndex(
      (g) => g.id === formData.gradoId
    );

    if (indexSeleccionado !== -1) {
      const filtrados = grados.slice(0, indexSeleccionado + 1);
      setGradosFiltrados(filtrados);
    } else {
      setGradosFiltrados(grados);
    }
  }, [formData.gradoId, grados]);

  // Nuevo: poner "N/A" en Institución anterior si queda vacío
  useEffect(() => {
    if (
      formData.ultimoGradoCursado &&
      !formData.institucionEducativaAnterior?.trim()
    ) {
      setValue("institucionEducativaAnterior", "N/A");
    }
  }, [
    formData.ultimoGradoCursado,
    formData.institucionEducativaAnterior,
    setValue,
  ]);

  const handleAutocompleteChange =
    (fieldName: AutocompleteFields) =>
    (_: React.SyntheticEvent, value: OpcionSelect | null) => {
      const newValue = value?.id || "";
      setValue(fieldName, newValue);

      if (fieldName === "gradoId") {
        if (!newValue) {
          setPensionValue("");
          setValue("pensionId", "");
          return;
        }

        setLoadingPension(true);
        api
          .get(`/pensiones/by-grado/${newValue}`)
          .then((response) => {
            if (response.data?.length > 0) {
              const pension = response.data[0];
              setPensionValue(pension.valor.toString());
              setValue("pensionId", pension.id);
              setValue("pensionValor", pension.valor);
            }
          })
          .catch((error: Error) => {
            console.error("Error al cargar pensión:", error);
            enqueueSnackbar("Error al cargar el valor de la pensión", {
              variant: "error",
            });
          })
          .finally(() => setLoadingPension(false));
      }

      if (fieldName === "paisNacimiento") {
        setLoadingDepartamentos(true);
        cargarDepartamentos(newValue)
          .catch((error: Error) =>
            console.error("Error cargando departamentos:", error)
          )
          .finally(() => setLoadingDepartamentos(false));
        setValue("departamentoNacimiento", "");
        setValue("municipioNacimiento", "");
      } else if (fieldName === "departamentoNacimiento") {
        setLoadingCiudades(true);
        cargarCiudades(newValue)
          .catch((error: Error) =>
            console.error("Error cargando ciudades:", error)
          )
          .finally(() => setLoadingCiudades(false));
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
              loading={loadingDepartamentos}
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
              loading={loadingCiudades}
              rules={{ required: "Este campo es obligatorio" }}
            />
          </Grid>

          {/* Sede */}
          <Grid size={{ xs: 12, sm: 5, md: 5 }}>
            <CustomAutocomplete<FormDataType, OpcionSelect>
              label="Sede para donde se matrícula *"
              name="sedeMatricula"
              options={sedes}
              control={control}
              onChange={handleAutocompleteChange("sedeMatricula")}
              getOptionLabel={(option: OpcionSelect) => option.nombre}
              getOptionValue={(option) => option.id}
              rules={{ required: "Este campo es obligatorio" }}
              disabled={sedes.length === 1}
            />
          </Grid>

          {/* Grado a matricular */}
          <Grid size={{ xs: 12, sm: 3, md: 3 }}>
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
          </Grid>

          {/* Valor de la pensión (solo lectura) */}
          <Grid size={{ xs: 12, sm: 5, md: 4 }}>
            <TextField
              label="Pensión"
              name="pensionDisplay"
              fullWidth
              value={
                loadingPension
                  ? "Cargando..."
                  : pensionValue
                  ? `$${parseInt(pensionValue).toLocaleString("es-CO")}`
                  : "No disponible"
              }
              disabled
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              sx={{
                "& .MuiInputBase-input": {
                  color: pensionValue ? "inherit" : "#999",
                  fontWeight: pensionValue ? "bold" : "normal",
                },
              }}
            />
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
          <Grid size={{ xs: 12, sm: 9, md: 9 }}>
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
              options={gradosFiltrados}
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
