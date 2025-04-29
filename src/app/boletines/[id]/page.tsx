"use client";

import React, { useEffect, useState } from "react";
import {
  SubmitHandler,
  FormProvider,
  useForm,
  useFieldArray,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import api from "../../axios/axiosClient";
import { useParams } from "next/navigation";
import { useSnackbar } from "notistack";
import FusionTemplateColegio from "../../components/TemplateColegio";
import StudentCard from "@/app/components/personalizados/StudentCard";
import CustomTextField from "@/app/components/personalizados/CustomTextField";
import { AxiosError } from "axios";

interface Materia {
  nombre: string;
  estandar?: string | null;
  debilidades?: string | null;
  recomendaciones?: string | null;
  intensidadHoraria: number;
  fallas: number;
  valoracion: number;
}

interface FormValues {
  estudiante: {
    id: number;
    nombre: string;
    gradoId: number;
    grado: string;
    directorGrupo: string;
    periodo: string;
    fechaReporte: string;
  };
  materias: Materia[];
  observaciones: string | null;
}

const schema: yup.ObjectSchema<FormValues> = yup.object({
  estudiante: yup
    .object({
      id: yup.number().required(),
      nombre: yup.string().required(),
      gradoId: yup.number().required(),
      grado: yup.string().required(),
      directorGrupo: yup.string().required(),
      periodo: yup.string().required(),
      fechaReporte: yup.string().required(),
    })
    .required(),

  materias: yup
    .array()
    .of(
      yup
        .object({
          nombre: yup.string().required(),
          estandar: yup.string().nullable().defined(),
          debilidades: yup.string().nullable().defined(),
          recomendaciones: yup.string().nullable().defined(),
          intensidadHoraria: yup.number().min(0).max(99).required(),
          fallas: yup.number().min(0).max(99).required(),
          valoracion: yup.number().min(0).max(5).required(),
        })
        .defined()
    )
    .required(),

  observaciones: yup.string().nullable().defined(),
});

const PaginaBoletin = () => {
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const id = params?.id as string;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      estudiante: {
        id: 0,
        nombre: "",
        gradoId: 0,
        grado: "",
        directorGrupo: "",
        periodo: "I",
        fechaReporte: new Date().toLocaleDateString(),
      },
      materias: [],
      observaciones: null,
    },
  });

  const { control, setValue, reset, watch, handleSubmit } = methods;
  const { fields } = useFieldArray({ control, name: "materias" });

  const formData = watch();

  const calcularTotales = (materias: Materia[]) => {
    let totalHoras = 0;
    let totalFallas = 0;
    let sumaValoraciones = 0;
    let materiasConNota = 0;

    materias.forEach((materia) => {
      const intensidad = Number(materia.intensidadHoraria) || 0;
      const fallas = Number(materia.fallas) || 0;
      const valoracion = Number(materia.valoracion) || 0;

      totalHoras += intensidad;
      totalFallas += fallas;

      if (valoracion > 0) {
        sumaValoraciones += valoracion;
        materiasConNota++;
      }
    });

    const promedioFinal =
      materiasConNota > 0 ? sumaValoraciones / materiasConNota : 0;

    return {
      totalHoras,
      totalFallas,
      promedioFinal: parseFloat(promedioFinal.toFixed(2)),
    };
  };

  useEffect(() => {
    if (!id) return;

    const cargarDatos = async () => {
      try {
        setLoading(true);
        const alumnoResponse = await api.get(`/alumnos/${id}`);
        const alumnoData = alumnoResponse.data?.data;
        const gradoId = alumnoData?.gradoId;

        if (!gradoId)
          throw new Error("No se pudo obtener el grado del estudiante");

        const [materiasResponse, directoraResponse] = await Promise.all([
          api.get(`/materias/grado/${gradoId}`),
          api.get(`/grados/${gradoId}/directora`),
        ]);

        reset({
          estudiante: {
            id: alumnoData.id,
            nombre: `${alumnoData.nombre} ${alumnoData.apellido}`.trim(),
            gradoId: gradoId,
            grado: alumnoData.gradoNombre,
            directorGrupo: directoraResponse.data.data,
            periodo: "I",
            fechaReporte: new Date().toLocaleDateString(),
          },
          materias: materiasResponse.data.map((materia: Materia) => ({
            nombre: materia.nombre,
            estandar: "",
            debilidades: "",
            recomendaciones: "",
            intensidadHoraria: materia.intensidadHoraria || 0,
            fallas: 0,
            valoracion: 0,
          })),
          observaciones: null,
        });
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Error al cargar datos";
        setError(errorMessage);
        enqueueSnackbar(errorMessage, { variant: "error" });
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, [id, enqueueSnackbar, reset]);

  const guardarBoletin: SubmitHandler<FormValues> = async (data) => {
    try {
      setLoading(true);
      const response = await api.post("/boletines/crearBoletin", data);
      enqueueSnackbar(response.data.message, { variant: "success" });
    } catch (err) {
      const errorMessage =
        err instanceof AxiosError
          ? err.response?.data?.message || "Error al guardar el boletín"
          : "Error al guardar el boletín";
      setError(errorMessage);
      enqueueSnackbar(errorMessage, { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const { totalHoras, totalFallas, promedioFinal } = calcularTotales(
    formData.materias
  );

  if (loading && !formData.estudiante.nombre) {
    return (
      <FusionTemplateColegio>
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      </FusionTemplateColegio>
    );
  }

  //console.log("boeltines carlos",   formData);

  return (
    <FusionTemplateColegio>
      <Box p={{ xs: 1, sm: 3, md: 4 }}>
        <Typography variant="h4" gutterBottom>
          Boletín de Notas
        </Typography>

        <StudentCard
          nombre={formData.estudiante.nombre}
          grado={formData.estudiante.grado}
          periodo={formData.estudiante.periodo}
          fechaReporte={formData.estudiante.fechaReporte}
          directorGrupo={formData.estudiante.directorGrupo}
          onPeriodoChange={(nuevoPeriodo) =>
            setValue("estudiante.periodo", nuevoPeriodo)
          }
        />

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(guardarBoletin)}>
            <TableContainer
              component={Paper}
              sx={{ mb: 3, boxShadow: 3, borderRadius: 2, overflowX: "auto" }}
            >
              <Table size={isMobile ? "small" : "medium"}>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#1976d2" }}>
                    {[
                      "Materia",
                      "Estándar",
                      "Debilidades",
                      "IH",
                      "Fallas",
                      "Valoración",
                      "Nivel",
                    ].map((head) => (
                      <TableCell
                        key={head}
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          color: "white",
                        }}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                <TableBody>
                  {fields.map((field, index) => (
                    <TableRow key={field.id}>
                      <TableCell>{field.nombre}</TableCell>

                      <TableCell>
                        <CustomTextField<FormValues>
                          name={`materias.${index}.estandar`}
                          label="Estándar"
                          maxLength={250}
                          showCharCount
                        />
                      </TableCell>

                      <TableCell>
                        <CustomTextField<FormValues>
                          name={`materias.${index}.debilidades`}
                          label="Debilidades"
                          maxLength={250}
                          showCharCount
                        />
                      </TableCell>

                      {/* IH */}
                      <TableCell align="center">
                        <CustomTextField<FormValues>
                          name={`materias.${index}.intensidadHoraria`}
                          label="IH"
                          type="text"
                          maxLength={2}
                          InputProps={{
                            inputProps: {
                              inputMode: "numeric",
                              pattern: "[0-9]*",
                            },
                          }}
                        />
                      </TableCell>

                      {/* Fallas */}
                      <TableCell align="center">
                        <CustomTextField<FormValues>
                          name={`materias.${index}.fallas`}
                          label="Fallas"
                          type="text"
                          maxLength={2}
                          InputProps={{
                            inputProps: {
                              inputMode: "numeric",
                              pattern: "[0-9]*",
                            },
                          }}
                        />
                      </TableCell>

                      {/* Valoración */}
                      <TableCell align="center">
                        <CustomTextField<FormValues>
                          name={`materias.${index}.valoracion`}
                          label="Valoración"
                          type="text"
                          maxLength={3}
                          InputProps={{
                            inputProps: {
                              inputMode: "decimal",
                              pattern: "^\\d*(\\.\\d{0,1})?$",
                            },
                          }}
                          onInput={(e) => {
                            const input = e.target as HTMLInputElement;
                            input.value = input.value.replace(",", "."); // Cambia coma por punto
                          }}
                        />
                      </TableCell>

                      <TableCell align="center">
                        {determinarNivel(formData.materias[index]?.valoracion)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {formData.materias.length > 0 && (
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  mb: 3,
                  borderRadius: 2,
                  backgroundColor: "grey.50",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="subtitle1">
                    <strong>Total Horas:</strong> {totalHoras}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Total Fallas:</strong> {totalFallas}
                  </Typography>
                  <Typography variant="subtitle1">
                    <strong>Promedio Final:</strong> {promedioFinal.toFixed(2)}
                  </Typography>
                </Box>
              </Paper>
            )}

            <CustomTextField<FormValues>
              name="observaciones"
              label="Observaciones"
              multiline
              rows={4}
              maxLength={250}
              showCharCount
            />

            <Box display="flex" justifyContent="flex-end" gap={2} mt={4}>
              <Button variant="contained" type="submit" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : "Guardar Boletín"}
              </Button>
            </Box>
          </form>
        </FormProvider>
      </Box>
    </FusionTemplateColegio>
  );
};

const determinarNivel = (valoracion: number) => {
  if (valoracion >= 4.6) return "SUPERIOR";
  if (valoracion >= 4.0) return "ALTO";
  if (valoracion >= 2.9) return "BÁSICO";
  return "BAJO";
};

export default PaginaBoletin;
