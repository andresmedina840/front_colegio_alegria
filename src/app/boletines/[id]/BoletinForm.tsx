"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
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
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import api from "../../axios/axiosClient";

interface Materia {
  id: number;
  nombre: string;
}

interface Nota {
  materiaId: number;
  nombre: string;
  fortalezas: string;
  valoracion: string;
  nivel: string;
}

const BoletinForm = () => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>(); // ID del estudiante
  const [materias, setMaterias] = useState<Materia[]>([]);
  const [notas, setNotas] = useState<Nota[]>([]);
  const [cargando, setCargando] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const crearYObtenerBoletin = async () => {
      try {
        // Intentar obtener el boletín
        const response = await api.get(`/boletines/${id}`);
        console.log("Boletín obtenido:", response.data);
      } catch (err) {
        if (err instanceof Error) {
          if ((err as any).response?.status === 404) {
            console.log("Boletín no encontrado, creando uno nuevo...");
            await api.post(`/boletines`, { estudianteId: id });
          } else {
            setError("Error al obtener el boletín: " + err.message);
            return;
          }
        } else {
          setError("Error desconocido al obtener el boletín.");
          return;
        }
      }

      // Obtener materias del estudiante
      try {
        const responseMaterias = await api.get(`/materias/estudiante/${id}`);
        setMaterias(responseMaterias.data.data);

        const notasIniciales = responseMaterias.data.data.map(
          (materia: Materia) => ({
            materiaId: materia.id,
            nombre: materia.nombre,
            fortalezas: "",
            valoracion: "",
            nivel: "",
          })
        );

        setNotas(notasIniciales);
      } catch (err) {
        if (err instanceof Error) {
          setError("Error al cargar las materias: " + err.message);
        } else {
          setError("Error desconocido al cargar las materias.");
        }
      } finally {
        setCargando(false);
      }
    };
    crearYObtenerBoletin();
  }, [id]);

  const handleNotaChange = (
    index: number,
    field: keyof Nota,
    value: string
  ) => {
    setNotas((prevNotas) => {
      const nuevasNotas = [...prevNotas];
      nuevasNotas[index] = { ...nuevasNotas[index], [field]: value };
      return nuevasNotas;
    });
  };

  const handleGuardarBoletin = async () => {
    try {
      setCargando(true);
      await api.post(`/boletines`, {
        estudianteId: id,
        notas,
      });
      router.push("/boletines");
    } catch (err) {
      setError("Error al guardar el boletín.");
    } finally {
      setCargando(false);
    }
  };

  if (cargando)
    return <CircularProgress sx={{ display: "block", mx: "auto", my: 3 }} />;

  return (
    <Box p={4} maxWidth={800} mx="auto">
      <Typography
        variant="h4"
        gutterBottom
        fontWeight={700}
        color="primary.main"
      >
        Registro de Notas
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <TableContainer
        component={Paper}
        sx={{ mt: 3, borderRadius: 2, border: 1, borderColor: "divider" }}
      >
        <Table>
          <TableHead sx={{ bgcolor: "primary.main" }}>
            <TableRow>
              <TableCell
                sx={{ color: "primary.contrastText", fontWeight: 700 }}
              >
                Materia
              </TableCell>
              <TableCell
                sx={{ color: "primary.contrastText", fontWeight: 700 }}
              >
                Fortalezas
              </TableCell>
              <TableCell
                sx={{ color: "primary.contrastText", fontWeight: 700 }}
              >
                Valoración
              </TableCell>
              <TableCell
                sx={{ color: "primary.contrastText", fontWeight: 700 }}
              >
                Nivel
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notas.map((nota, index) => (
              <TableRow key={nota.materiaId}>
                <TableCell>{nota.nombre}</TableCell>
                <TableCell>
                  <TextField
                    type="text"
                    variant="outlined"
                    size="small"
                    value={nota.fortalezas}
                    onChange={(e) =>
                      handleNotaChange(index, "fortalezas", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="text"
                    variant="outlined"
                    size="small"
                    value={nota.valoracion}
                    onChange={(e) =>
                      handleNotaChange(index, "valoracion", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    type="text"
                    variant="outlined"
                    size="small"
                    value={nota.nivel}
                    onChange={(e) =>
                      handleNotaChange(index, "nivel", e.target.value)
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        fullWidth
        onClick={handleGuardarBoletin}
        disabled={cargando}
      >
        {cargando ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Guardar Boletín"
        )}
      </Button>
    </Box>
  );
};

export default BoletinForm;
