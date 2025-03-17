"use client";

import React, { useState, useEffect } from "react";
import FusionTemplateColegio from "../components/TemplateColegio";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  Select,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import axiosClient from "../axios/axiosClient";
import { GradoAcademico, BoletinEstudiante, EstadoCarga } from "../types";
import SearchIcon from "@mui/icons-material/Search";

const SeleccionGrado = ({
  grados,
  onChange,
}: {
  grados: GradoAcademico[];
  onChange: (valor: number) => void;
}) => (
  <FormControl fullWidth variant="outlined" margin="normal">
    <InputLabel>Seleccione Grado</InputLabel>
    <Select
      native
      onChange={(e) => onChange(Number(e.target.value))}
      label="Seleccione Grado"
    >
      <option value="">Seleccione una opción</option>
      {grados.map((grado) => (
        <option key={grado.id} value={grado.id}>
          {grado.nombre} (Capacidad: {grado.capacidad})
        </option>
      ))}
    </Select>
  </FormControl>
);

const FilaEstudiante = ({ boletin }: { boletin: BoletinEstudiante }) => {
  const promedio =
    boletin.materias.reduce(
      (total, materia) => total + materia.calificacion,
      0
    ) / boletin.materias.length;

  return (
    <TableRow hover>
      <TableCell>{boletin.estudiante}</TableCell>
      <TableCell>{boletin.grado}</TableCell>
      <TableCell>
        {boletin.materias.map((materia) => (
          <div key={materia.materia} style={{ marginBottom: "8px" }}>
            <strong>{materia.materia}:</strong>
            <span style={{ marginLeft: "8px" }}>{materia.calificacion}</span>
            <span style={{ marginLeft: "16px", color: "#666" }}>
              (Inasistencias: {materia.inasistencias})
            </span>
          </div>
        ))}
      </TableCell>
      <TableCell>
        <Typography variant="body1" color="primary">
          {promedio.toFixed(2)}
        </Typography>
      </TableCell>
    </TableRow>
  );
};

export default function PaginaBoletines() {
  const [boletines, setBoletines] = useState<BoletinEstudiante[]>([]);
  const [grados, setGrados] = useState<GradoAcademico[]>([]);
  const [gradoSeleccionado, setGradoSeleccionado] = useState<number>(0);
  const [estado, setEstado] = useState<EstadoCarga>({
    cargando: false,
    mensajeError: "",
  });

  useEffect(() => {
    const cargarGrados = async () => {
      try {
        const { data } = await axiosClient.get<GradoAcademico[]>(
          "/grados/listaGrados"
        );
        console.log(data);
        setGrados(data);
      } catch (error) {
        setEstado({
          cargando: false,
          mensajeError: "Error cargando grados académicos",
        });
      }
    };
    cargarGrados();
  }, []);

  const generarBoletines = async () => {
    if (!gradoSeleccionado) return;

    setEstado({ cargando: true, mensajeError: "" });

    try {
      const { data } = await axiosClient.get<BoletinEstudiante[]>(
        `/boletines?grado=${gradoSeleccionado}`
      );
      setBoletines(data);
    } catch (error) {
      setEstado({
        cargando: false,
        mensajeError: "Error generando reporte. Intente nuevamente.",
      });
    } finally {
      setEstado((prev) => ({ ...prev, cargando: false }));
    }
  };

  return (
    <FusionTemplateColegio>
      <Box p={4}>
        
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: "primary.main",
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 4,
          }}
        >
          <SearchIcon fontSize="large" />
          Reportes Académicos
        </Typography>

        <Box display="flex" gap={3} mb={4}>
          <SeleccionGrado grados={grados} onChange={setGradoSeleccionado} />

          <Button
            variant="contained"
            onClick={generarBoletines}
            disabled={!gradoSeleccionado || estado.cargando}
            sx={{ height: "56px" }}
          >
            {estado.cargando ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Generar Reporte"
            )}
          </Button>
        </Box>

        {estado.mensajeError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {estado.mensajeError}
          </Alert>
        )}

        <TableContainer component={Paper} elevation={3}>
          <Table aria-label="Tabla de rendimiento académico">
            <TableHead sx={{ bgcolor: "background.default" }}>
              <TableRow>
                <TableCell>Estudiante</TableCell>
                <TableCell>Grado</TableCell>
                <TableCell>Detalle por Materia</TableCell>
                <TableCell>Promedio General</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {boletines.map((boletin) => (
                <FilaEstudiante key={boletin.id} boletin={boletin} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </FusionTemplateColegio>
  );
}
