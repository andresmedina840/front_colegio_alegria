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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
  Alert,
} from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";
import FusionTemplateColegio from "../../components/TemplateColegio";
import api from "../../axios/axiosClient";
import { useRouter, useParams } from "next/navigation";
import StudentCard from "@/app/components/personalizados/StudentCard";
import CustomTextField from "@/app/components/personalizados/CustomTextField";

interface Materia {
  nombre: string;
  fortalezas: string;
  debilidades: string;
  recomendaciones: string;
  valoracion: number;
  intensidadHoraria: number;
  fallas: number;
  nivelDesempeno: string;
}

interface BoletinData {
  estudiante: {
    id: number;
    nombre: string;
    grado: string;
    directorGrupo: string;
    periodo: string;
    fechaReporte: string;
  };
  materias: Materia[];
  observaciones: string;
}

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  table: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCellHeader: {
    backgroundColor: "#f0f0f0",
    padding: 5,
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableCell: {
    padding: 5,
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
});

const PaginaBoletin = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<BoletinData>({
    estudiante: {
      id: 0,
      nombre: "",
      grado: "",
      directorGrupo: "",
      periodo: "IV",
      fechaReporte: new Date().toLocaleDateString(),
    },
    materias: [],
    observaciones: "",
  });

  useEffect(() => {
    if (!id) return;

    const cargarDatos = async () => {
      try {
        const alumnoResponse = await api.get(`/alumnos/${id}`);
        const alumnoData = alumnoResponse.data?.data;
        const gradoIdEstudiante = alumnoData?.gradoId;

        if (!gradoIdEstudiante) {
          console.error("Error: gradoId es undefined: ", gradoIdEstudiante);
          return;
        }

        const materiasResponse = await api.get(
          `/materias/grado/${gradoIdEstudiante}`
        );

        const materiasTransformadas = materiasResponse.data.map(
          (materia: any) => ({
            nombre: materia.nombre,
            fortalezas: "",
            debilidades: "",
            recomendaciones: "",
            valoracion: 0,
            intensidadHoraria: 0,
            fallas: 0,
            nivelDesempeno: "ALTO",
          })
        );

        setFormData({
          estudiante: {
            id: alumnoData.id,
            nombre: `${alumnoData.nombre} ${alumnoData.apellido}`.trim(),
            grado: alumnoData.gradoNombre,
            directorGrupo: "Ángela Jimena Inseca Cruz",
            periodo: "IV",
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
      await api.post("/boletines", formData);
      alert("Boletín guardado exitosamente");
    } catch (err) {
      setError("Error al guardar el boletín");
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <FusionTemplateColegio>
      <Box p={4}>
        <Typography variant="h4" gutterBottom>
          REGISTRO ESCOLAR DE VALORACIÓN DESCRIPTIVO -{" "}
          {formData.estudiante.nombre}
        </Typography>

        <StudentCard
          nombre={formData.estudiante.nombre}
          grado={formData.estudiante.grado}
          periodo={formData.estudiante.periodo}
          fechaReporte={formData.estudiante.fechaReporte}
          directorGrupo={formData.estudiante.directorGrupo}
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
                    width: 20,
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
                      onChange={(e) =>
                        handleChangeMateria(
                          index,
                          "valoracion",
                          Number(e.target.value)
                        )
                      }
                      inputProps={{ step: "0.1", min: "0", max: "5" }}
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
                  <TableCell>
                    <FormControl fullWidth>
                      <InputLabel>Nivel</InputLabel>
                      <Select
                        value={materia.nivelDesempeno}
                        onChange={(e) =>
                          handleChangeMateria(
                            index,
                            "nivelDesempeno",
                            e.target.value
                          )
                        }
                        sx={{
                          width: 70,
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
                      >
                        {["SUPERIOR", "ALTO", "BÁSICO", "BAJO"].map((nivel) => (
                          <MenuItem key={nivel} value={nivel}>
                            {nivel}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
              ))}
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
