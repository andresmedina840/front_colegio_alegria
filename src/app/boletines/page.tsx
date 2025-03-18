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
  Toolbar,
} from "@mui/material";
import axiosClient from "../axios/axiosClient";
import { GradoAcademico, BoletinEstudiante, EstadoCarga } from "../types";
import AssessmentIcon from '@mui/icons-material/Assessment';

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
  const [consultaRealizada, setConsultaRealizada] = useState(false);

  useEffect(() => {
    const cargarGrados = async () => {
      try {
        const { data } = await axiosClient.get<GradoAcademico[]>(
          "/grados/listaGrados"
        );
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

    setConsultaRealizada(true);
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
        <Box sx={{ 
          maxWidth: 1200,
          mx: "auto",
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 3,
          p: 4,
          mb: 4
        }}>
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
            <AssessmentIcon fontSize="large" />
            Reportes Académicos
          </Typography>

          <Box display="flex" gap={3} mb={4}>
            <SeleccionGrado grados={grados} onChange={setGradoSeleccionado} />

            <Button
              variant="contained"
              onClick={generarBoletines}
              disabled={!gradoSeleccionado || estado.cargando}
              sx={{ 
                minWidth: 180,
                height: 56,
                fontSize: "1rem",
                "& .MuiButton-startIcon": {
                  marginRight: estado.cargando ? 0 : 1,
                }
              }}
            >
              {estado.cargando ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Generar Reporte"
              )}
            </Button>
          </Box>

          {estado.mensajeError && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 1 }}>
              {estado.mensajeError}
            </Alert>
          )}

          {consultaRealizada && (
            <TableContainer
              component={Paper}
              sx={{
                border: 2,
                borderColor: "divider",
                borderRadius: 2,
                overflowX: "auto",
              }}
            >
              <Table aria-label="Tabla de rendimiento académico" size="medium">
                <TableHead sx={{ bgcolor: "primary.main" }}>
                  <TableRow>
                    <TableCell sx={{ color: "primary.contrastText", fontWeight: 700 }}>Estudiante</TableCell>
                    <TableCell sx={{ color: "primary.contrastText", fontWeight: 700 }}>Grado</TableCell>
                    <TableCell sx={{ color: "primary.contrastText", fontWeight: 700 }}>Detalle por Materia</TableCell>
                    <TableCell sx={{ color: "primary.contrastText", fontWeight: 700 }}>Promedio General</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {boletines.length > 0 ? (
                    boletines.map((boletin) => (
                      <FilaEstudiante key={boletin.id} boletin={boletin} />
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                        <Typography variant="body1" color="text.disabled">
                          No hay resultados
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Box>
    </FusionTemplateColegio>
  );
}