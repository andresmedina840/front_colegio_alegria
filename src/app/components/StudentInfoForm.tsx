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
              onChange={(value) => {
                handleChange({
                  target: {
                    name: "tipoIdentificacionEstudianteId",
                    value: value ? value.id : "",
                  },
                } as React.ChangeEvent<HTMLInputElement>);
              }}
              getOptionLabel={(option) => option.nombre} // Muestra el nombre en el dropdown
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
          {/* Resto de campos */}
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
              options={grados.map((grado) => grado.id)}
              value={formData.gradoId || ""}
              onChange={(value) => {
                handleChange({
                  target: { name: "gradoId", value: value ?? "" },
                } as React.ChangeEvent<HTMLInputElement>);

                if (value) {
                  setLoadingPension(true);
                  api
                    .get(`/pensiones/by-grado/${value}`)
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
                } else {
                  setPensionValue("");
                  handleChange({
                    target: { name: "pensionId", value: "" },
                  } as React.ChangeEvent<HTMLInputElement>);
                }
              }}
              getOptionLabel={(option) =>
                grados.find((g) => g.id === option)?.nombre || ""
              }
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
              options={jornadaEscolar}
              name="jornada"
              required
              value={formData.jornada || ""}
              onChange={(value) =>
                handleChange({
                  target: { name: "jornada", value: value ?? "" },
                } as React.ChangeEvent<HTMLInputElement>)
              }
              getOptionLabel={(option) => option}
            />
          </Grid>
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
              options={grados.map((grado) => grado.id)}
              value={formData.ultimoGradoCursado || ""}
              onChange={(value) =>
                handleChange({
                  target: { name: "ultimoGradoCursado", value: value ?? "" },
                } as React.ChangeEvent<HTMLInputElement>)
              }
              getOptionLabel={(option) =>
                grados.find((g) => g.id === option)?.nombre || ""
              }
            />
          </Grid>
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
              onChange={(value) =>
                handleChange({
                  target: {
                    name: "generoEstudianteId",
                    value: value ? value.id : "",
                  },
                } as React.ChangeEvent<HTMLInputElement>)
              }
              getOptionLabel={(option) => option.nombre} // Muestra el nombre en la lista
            />
          </Grid>

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
              options={paises.map((pais) => pais.id)}
              value={formData.paisNacimiento || ""}
              onChange={(value) => {
                handleChange({
                  target: { name: "paisNacimiento", value: value ?? "" },
                } as React.ChangeEvent<HTMLInputElement>);
                cargarDepartamentos(value ?? "");
              }}
              getOptionLabel={(option) =>
                paises.find((p) => p.id === option)?.nombre || ""
              }
            />
          </Grid>

          {/* Campo Departamento de Nacimiento */}
          <Grid item xs={12} sm={6}>
            <CustomAutocomplete
              label="Departamento de Nacimiento"
              name="departamentoNacimiento"
              required
              options={departamentos.map((dep) => dep.id)}
              value={formData.departamentoNacimiento || ""}
              onChange={(value) => {
                handleChange({
                  target: {
                    name: "departamentoNacimiento",
                    value: value ?? "",
                  },
                } as React.ChangeEvent<HTMLInputElement>);
                cargarCiudades(value ?? "");
              }}
              getOptionLabel={(option) =>
                departamentos.find((d) => d.id === option)?.nombre || ""
              }
              disabled={!formData.paisNacimiento}
            />
          </Grid>

          {/* Campo Municipio de Nacimiento */}
          <Grid item xs={12} sm={5}>
            <CustomAutocomplete
              label="Municipio de Nacimiento"
              name="municipioNacimiento"
              required
              options={ciudades.map((ciudad) => ciudad.id)}
              value={formData.municipioNacimiento || ""}
              onChange={(value) =>
                handleChange({
                  target: { name: "municipioNacimiento", value: value ?? "" },
                } as React.ChangeEvent<HTMLInputElement>)
              }
              getOptionLabel={(option) =>
                ciudades.find((c) => c.id === option)?.nombre || ""
              }
              disabled={!formData.departamentoNacimiento}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StudentInfoForm;
