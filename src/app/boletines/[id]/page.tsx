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
} from "@mui/material";
import FusionTemplateColegio from "../../components/TemplateColegio";
import api from "../../axios/axiosClient";
import { useParams } from "next/navigation";
import StudentCard from "@/app/components/personalizados/StudentCard";
import CustomTextField from "@/app/components/personalizados/CustomTextField";
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
  valoracion: number;
  recomendaciones: string;
}

interface BoletinData {
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
  observaciones: string;
}

const PaginaBoletin = () => {
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const id = params?.id as string;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalHoras, setTotalHoras] = useState(0);
  const [totalFallas, setTotalFallas] = useState(0);
  const [promedio, setPromedio] = useState(0);

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

  const determinarNivel = (valoracion: number) => {
    if (valoracion >= 4.6) return "SUPERIOR";
    if (valoracion >= 4.0) return "ALTO";
    if (valoracion >= 2.9) return "BÁSICO";
    return "BAJO";
  };

  useEffect(() => {
    const calcularTotales = () => {
      const horas = formData.materias.reduce(
        (acc, materia) => acc + materia.intensidadHoraria,
        0
      );
      const fallas = formData.materias.reduce(
        (acc, materia) => acc + materia.fallas,
        0
      );
      const valoraciones = formData.materias.reduce(
        (acc, materia) => acc + materia.valoracion,
        0
      );
      const promedioCalc =
        formData.materias.length > 0
          ? valoraciones / formData.materias.length
          : 0;

      setTotalHoras(horas);
      setTotalFallas(fallas);
      setPromedio(promedioCalc);
    };

    calcularTotales();
  }, [formData.materias]);

  useEffect(() => {
    if (!id) return;

    const cargarDatos = async () => {
      try {
        const alumnoResponse = await api.get(`/alumnos/${id}`);
        const alumnoData = alumnoResponse.data?.data;
        const gradoIdEstudiante = alumnoData?.gradoId;
        if (!gradoIdEstudiante) return;

        const [materiasResponse, directoraResponse] = await Promise.all([
          api.get(`/materias/grado/${gradoIdEstudiante}`),
          api.get(`/grados/${gradoIdEstudiante}/directora`),
        ]);

        const materiasTransformadas = materiasResponse.data.map(
          (materia: MateriaAPI) => ({
            nombre: materia.nombre,
            fortalezas: "",
            debilidades: "",
            recomendaciones: "",
            valoracion: 0,
            intensidadHoraria: materia.intensidadHoraria || 0,
            fallas: 0,
          })
        );

        setFormData({
          estudiante: {
            id: alumnoData.id,
            nombre: `${alumnoData.nombre} ${alumnoData.apellido}`.trim(),
            gradoId: gradoIdEstudiante,
            grado: alumnoData.gradoNombre,
            directorGrupo: directoraResponse.data.data,
            periodo: "I",
            fechaReporte: new Date().toLocaleDateString(),
          },
          materias: materiasTransformadas,
          observaciones: "",
        });
      } catch (err) {
        setError("Error al cargar datos");
        console.error("Error en carga de datos:", err);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, [id]);

  const handleChangeMateria = (
    index: number,
    campo: keyof Materia,
    valor: string | number
  ) => {
    const nuevasMaterias = [...formData.materias];
    nuevasMaterias[index] = {
      ...nuevasMaterias[index],
      [campo]: valor,
    };
    setFormData({ ...formData, materias: nuevasMaterias });
  };

  const guardarBoletin = async () => {
    try {
      const {
        data: { message },
      } = await api.post("/boletines/crearBoletin", formData);

      enqueueSnackbar(message, { variant: "success" });
    } catch (err) {
      let errorMessage = "Error al guardar el boletín";

      if (err instanceof Error) {
        const axiosError = err as AxiosError<{ message?: string }>;
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }

      console.error("Error en guardarBoletin:", errorMessage);
      setError(errorMessage);
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <FusionTemplateColegio>
      <Box p={4}>
        <Typography variant="h4" gutterBottom>
          Boletin de Notas
        </Typography>

        <StudentCard
          nombre={formData.estudiante.nombre}
          //gradoId={formData.estudiante.gradoId}
          grado={formData.estudiante.grado}
          periodo={formData.estudiante.periodo}
          fechaReporte={formData.estudiante.fechaReporte}
          directorGrupo={formData.estudiante.directorGrupo}
          onPeriodoChange={(nuevoPeriodo) =>
            setFormData({
              ...formData,
              estudiante: { ...formData.estudiante, periodo: nuevoPeriodo },
            })
          }
        />

        {error && <Alert severity="error">{error}</Alert>}

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
                    width: 200,
                  }}
                >
                  Materia
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "white",
                    width: 200,
                  }}
                >
                  Fortalezas
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "white",
                    width: 200,
                  }}
                >
                  Debilidades
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "white",
                    width: 20,
                  }}
                >
                  IH
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "white",
                    width: 20,
                  }}
                >
                  Fallas
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "white",
                    width: 80,
                  }}
                >
                  Valoración
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "white",
                    width: 50,
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
                  sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}
                >
                  <TableCell sx={{ textAlign: "left" }}>
                    {materia.nombre}
                  </TableCell>
                  <TableCell>
                    <CustomTextField
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
                    <CustomTextField
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
                    <CustomTextField
                      type="number"
                      value={materia.intensidadHoraria}
                      onChange={(e) =>
                        handleChangeMateria(
                          index,
                          "intensidadHoraria",
                          Number(e.target.value)
                        )
                      }
                      sx={{
                        width: 40,
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
                    />
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <CustomTextField
                      type="number"
                      value={materia.fallas}
                      onChange={(e) =>
                        handleChangeMateria(
                          index,
                          "fallas",
                          Number(e.target.value)
                        )
                      }
                      sx={{
                        width: 40,
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
                    />
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <CustomTextField
                      type="number"
                      value={materia.valoracion}
                      onChange={(e) => {
                        let value = Math.min(
                          5,
                          Math.max(0, Number(e.target.value))
                        ); // Cierre correcto
                        handleChangeMateria(index, "valoracion", value);
                      }}
                      inputProps={{
                        step: "0.1",
                        min: "0",
                        max: "5",
                      }}
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
                    />
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Typography>
                      {determinarNivel(materia.valoracion)}
                    </Typography>
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
                  {promedio.toFixed(1)}
                </TableCell>
                <TableCell sx={{ textAlign: "center", fontWeight: "bold" }}>
                  {determinarNivel(promedio)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <CustomTextField
          fullWidth
          label="Observaciones"
          multiline
          rows={4}
          value={formData.observaciones}
          onChange={(e) =>
            setFormData({ ...formData, observaciones: e.target.value })
          }
          sx={{ mb: 3 }}
        />
        <Box display="flex" gap={2} justifyContent="flex-end">
          <Button variant="contained" color="primary" onClick={guardarBoletin}>
            Guardar Boletín
          </Button>
        </Box>
      </Box>
    </FusionTemplateColegio>
  );
};

export default PaginaBoletin;
