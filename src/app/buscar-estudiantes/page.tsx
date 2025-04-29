"use client";

import React, { useState } from "react";
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
  Button,
  CircularProgress,
  Alert,
  InputAdornment,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import api from "../axios/axiosClient";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";

interface Estudiante {
  id: number;
  nombre: string;
  apellido: string;
  numeroIdentificacionEstudiante: string;
  gradoNombre: string;
  gradoId: number;
  acudientes: string[];
  numeroMatricula: number;
}

interface EstadoBusqueda {
  cargando: boolean;
  mensajeError: string;
  busquedaRealizada: boolean;
}

interface MateriaResponse {
  data: {
    id: number;
    nombre: string;
    intensidadHoraria?: number;
  }[];
  message?: string;
}

const BuscarEstudiantes = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [resultados, setResultados] = useState<Estudiante[]>([]);
  const [estado, setEstado] = useState<EstadoBusqueda>({
    cargando: false,
    mensajeError: "",
    busquedaRealizada: false,
  });

  const handleBuscar = async () => {
    if (!terminoBusqueda.trim()) return;

    setEstado({ ...estado, cargando: true, mensajeError: "" });

    try {
      const { data } = await api.get<{ data: Estudiante[] }>(`/alumnos/buscar?q=${terminoBusqueda}`);
      setResultados(data.data);
      setEstado((prev) => ({ ...prev, busquedaRealizada: true }));
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Error en la búsqueda";
      setEstado({
        cargando: false,
        mensajeError: errorMessage,
        busquedaRealizada: true,
      });
      enqueueSnackbar(errorMessage, { variant: "error" });
    } finally {
      setEstado((prev) => ({ ...prev, cargando: false }));
    }
  };

  const generarBoletin = async (estudiante: Estudiante) => {
    try {
      const { data } = await api.get<MateriaResponse>(`/materias/grado/${estudiante.gradoId}`);
      
      if (data.message) {
        enqueueSnackbar(data.message, { variant: "success" });
      }
      
      router.push(`/boletines/${estudiante.id}`);
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Error al obtener las materias";
      enqueueSnackbar(errorMessage, { variant: "error" });
      console.error("Error obteniendo materias:", error);
    }
  };

  return (
    <FusionTemplateColegio>
      <Box p={4}>
        <Box
          sx={{
            maxWidth: 1200,
            mx: "auto",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 3,
            p: 4,
            mb: 4,
          }}
        >
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
            Búsqueda de Estudiantes
          </Typography>

          <Box display="flex" gap={2} mb={4}>
            <TextField
              fullWidth
              variant="outlined"
              label="Nombre, apellido o documento"
              value={terminoBusqueda}
              onChange={(e) => setTerminoBusqueda(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleBuscar()}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="disabled" />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              variant="contained"
              onClick={handleBuscar}
              disabled={estado.cargando}
              sx={{
                minWidth: 140,
                height: 56,
                fontSize: "1rem",
              }}
            >
              {estado.cargando ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Buscar"
              )}
            </Button>
          </Box>

          {estado.mensajeError && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 1 }}>
              {estado.mensajeError}
            </Alert>
          )}

          {estado.busquedaRealizada && (
            <TableContainer component={Paper} sx={{ border: 2, borderColor: "divider", borderRadius: 2, overflowX: "auto" }}>
              <Table aria-label="Resultados de búsqueda" size="medium">
                <TableHead sx={{ bgcolor: "primary.main" }}>
                  <TableRow>
                    <TableCell sx={{ color: "primary.contrastText", fontWeight: 700 }}>Estudiante</TableCell>
                    <TableCell sx={{ color: "primary.contrastText", fontWeight: 700 }}>Documento</TableCell>
                    <TableCell sx={{ color: "primary.contrastText", fontWeight: 700 }}>Grado</TableCell>
                    <TableCell sx={{ color: "primary.contrastText", fontWeight: 700 }}>Acudientes</TableCell>
                    <TableCell sx={{ color: "primary.contrastText", fontWeight: 700 }}># Matricula</TableCell>
                    <TableCell sx={{ color: "primary.contrastText", fontWeight: 700 }} align="center">Acciones</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {resultados.length > 0 ? (
                    resultados.map((estudiante) => (
                      <TableRow key={estudiante.id} hover>
                        <TableCell>{`${estudiante.nombre} ${estudiante.apellido}`}</TableCell>
                        <TableCell>{estudiante.numeroIdentificacionEstudiante || "-"}</TableCell>
                        <TableCell>{estudiante.gradoNombre || "-"}</TableCell>                     
                        <TableCell>{(estudiante.acudientes || []).join(", ")}</TableCell>
                        <TableCell align="center">{estudiante.numeroMatricula || "-"}</TableCell>
                        <TableCell>
                          <Button variant="contained" color="primary" onClick={() => generarBoletin(estudiante)}>
                            Generar Boletín
                          </Button>

                          <Button variant="contained" color="secondary" onClick={() => generarBoletin(estudiante)}>
                            Consultar y/o Editar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">No se encontraron registros</TableCell>
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
};

export default BuscarEstudiantes;