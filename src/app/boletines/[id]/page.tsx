"use client";

import React, { useEffect, useState } from "react";
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
  TextField,
} from "@mui/material";
import FusionTemplateColegio from "../../components/TemplateColegio";
import api from "../../axios/axiosClient";
import { useParams } from "next/navigation";
import StudentCard from "@/app/components/personalizados/StudentCard";
import { useSnackbar } from "notistack";
import { AxiosError } from "axios";

interface MateriaAPI {
  nombre: string;
  intensidadHoraria?: number;
}

interface Materia {
  nombre: string;
  fortalezas: string;
  debilidades: string;
  intensidadHoraria: number;
  fallas: number;
  valoracion: string;
  recomendaciones: string;
}

interface Estudiante {
  id: number;
  nombre: string;
  gradoId: number;
  grado: string;
  directorGrupo: string;
  periodo: string;
  fechaReporte: string;
}

interface BoletinData {
  estudiante: Estudiante;
  materias: Materia[];
  observaciones: string;
}

const PaginaBoletin = () => {
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const id = params?.id as string;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<BoletinData>({
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
    observaciones: "",
  });

  // Calcular totales
  const { totalHoras, totalFallas, promedio } = formData.materias.reduce(
    (acc, materia) => ({
      totalHoras: acc.totalHoras + materia.intensidadHoraria,
      totalFallas: acc.totalFallas + materia.fallas,
      promedio: acc.promedio + parseFloat(materia.valoracion || "0"),
    }),
    { totalHoras: 0, totalFallas: 0, promedio: 0 }
  );

  const promedioFinal =
    formData.materias.length > 0 ? promedio / formData.materias.length : 0;

  const determinarNivel = (valoracion: number) => {
    if (valoracion >= 4.6) return "SUPERIOR";
    if (valoracion >= 4.0) return "ALTO";
    if (valoracion >= 2.9) return "BÁSICO";
    return "BAJO";
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

        setFormData({
          estudiante: {
            id: alumnoData.id,
            nombre: `${alumnoData.nombre} ${alumnoData.apellido}`.trim(),
            gradoId: gradoId,
            grado: alumnoData.gradoNombre,
            directorGrupo: directoraResponse.data.data,
            periodo: "I",
            fechaReporte: new Date().toLocaleDateString(),
          },
          materias: materiasResponse.data.map((materia: MateriaAPI) => ({
            nombre: materia.nombre,
            fortalezas: "",
            debilidades: "",
            recomendaciones: "",
            valoracion: 0,
            intensidadHoraria: materia.intensidadHoraria || 0,
            fallas: 0,
          })),
          observaciones: "",
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
  }, [id, enqueueSnackbar]);

  const handleChangeMateria = (
    index: number,
    campo: keyof Materia,
    valor: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      materias: prev.materias.map((m, i) =>
        i === index ? { ...m, [campo]: valor } : m
      ),
    }));
  };

  const handleValoracionChange = (index: number, value: string) => {
    if (value === "") {
      handleChangeMateria(index, "valoracion", 0);
      return;
    }

    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      handleChangeMateria(
        index,
        "valoracion",
        Math.min(5, Math.max(0, numericValue))
      );
    }
  };

  const guardarBoletin = async () => {
    try {
      setLoading(true);
      const {
        data: { message },
      } = await api.post("/boletines/crearBoletin", formData);
      enqueueSnackbar(message, { variant: "success" });
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

  if (loading && !formData.estudiante.nombre) {
    return (
      <FusionTemplateColegio>
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      </FusionTemplateColegio>
    );
  }

  return (
    <FusionTemplateColegio>
      <Box p={4}>
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
            setFormData((prev) => ({
              ...prev,
              estudiante: { ...prev.estudiante, periodo: nuevoPeriodo },
            }))
          }
        />

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TableContainer
          component={Paper}
          sx={{ mb: 3, boxShadow: 3, borderRadius: 2 }}
        >
          <Table sx={{ minWidth: 300 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#1976d2" }}>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  Materia
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  Fortalezas
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  Debilidades
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "white",
                    width: 80,
                  }}
                >
                  IH
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "white",
                    width: 80,
                  }}
                >
                  Fallas
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "white",
                    width: 100,
                  }}
                >
                  Valoración
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "white",
                    width: 100,
                  }}
                >
                  Nivel
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formData.materias.map((materia, index) => (
                <TableRow
                  key={index}
                  sx={index % 2 ? { backgroundColor: "#f9f9f9" } : {}}
                >
                  <TableCell>{materia.nombre}</TableCell>

                  <TableCell>
                    <TextField
                      fullWidth
                      multiline
                      value={materia.fortalezas}
                      onChange={(e) =>
                        handleChangeMateria(index, "fortalezas", e.target.value)
                      }
                      sx={{ backgroundColor: "white", borderRadius: 1 }}
                    />
                  </TableCell>

                  <TableCell>
                    <TextField
                      fullWidth
                      multiline
                      value={materia.debilidades}
                      onChange={(e) =>
                        handleChangeMateria(
                          index,
                          "debilidades",
                          e.target.value
                        )
                      }
                      sx={{ backgroundColor: "white", borderRadius: 1 }}
                    />
                  </TableCell>

                  <TableCell sx={{ textAlign: "center" }}>
                    <TextField
                      type="number"
                      value={materia.intensidadHoraria}
                      onChange={(e) =>
                        handleChangeMateria(
                          index,
                          "intensidadHoraria",
                          Math.max(0, Number(e.target.value))
                        )
                      }
                      sx={{
                        width: 60,
                        textAlign: "center",
                        borderRadius: 1,
                        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                          {
                            display: "none",
                          },
                        "& input[type=number]": {
                          MozAppearance: "textfield",
                        },
                      }}
                      inputProps={{ min: 0 }}
                    />
                  </TableCell>

                  <TableCell sx={{ textAlign: "center" }}>
                    <TextField
                      type="number"
                      value={materia.fallas}
                      onChange={(e) =>
                        handleChangeMateria(
                          index,
                          "fallas",
                          Math.max(0, Number(e.target.value))
                        )
                      }
                      sx={{
                        width: 60,
                        textAlign: "center",
                        borderRadius: 1,
                        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                          {
                            display: "none",
                          },
                        "& input[type=number]": {
                          MozAppearance: "textfield",
                        },
                      }}
                      inputProps={{ min: 0 }}
                    />
                  </TableCell>

                  <TableCell sx={{ textAlign: "center" }}>
                    <TextField
                      type="text"
                      value={materia.valoracion}
                      onChange={(e) => {
                        const value = e.target.value;

                        // Solo permitir valores numéricos con punto decimal
                        if (/^\d*\.?\d{0,2}$/.test(value)) {
                          handleChangeMateria(index, "valoracion", value);
                        }
                      }}
                      inputProps={{
                        inputMode: "decimal",
                        pattern: "\\d*\\.?\\d*",
                      }}
                      sx={{
                        width: 80,
                        textAlign: "center",
                        borderRadius: 1,
                      }}
                    />
                  </TableCell>

                  <TableCell sx={{ textAlign: "center" }}>
                    {determinarNivel(parseFloat(materia.valoracion))}
                  </TableCell>
                </TableRow>
              ))}

              <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                <TableCell
                  colSpan={3}
                  sx={{ textAlign: "right", fontWeight: "bold" }}
                >
                  TOTALES
                </TableCell>
                <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                  {totalHoras}
                </TableCell>
                <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                  {totalFallas}
                </TableCell>
                <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                  {promedioFinal.toFixed(1)}
                </TableCell>
                <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                  {determinarNivel(promedioFinal)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <TextField
          fullWidth
          label="Observaciones"
          multiline
          rows={4}
          value={formData.observaciones}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, observaciones: e.target.value }))
          }
          sx={{ mb: 3 }}
        />

        <Box display="flex" gap={2} justifyContent="flex-end">
          <Button
            variant="contained"
            color="primary"
            onClick={guardarBoletin}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Guardar Boletín"}
          </Button>
        </Box>
      </Box>
    </FusionTemplateColegio>
  );
};

export default PaginaBoletin;
