"use client";

import React, { useEffect, useState } from "react";
import FusionTemplateColegio from "../../components/TemplateColegio";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  CircularProgress,
} from "@mui/material";
import axiosClient from "../../axios/axiosClient";

interface Grado {
  id: number;
  nombre: string;
  numeroMaximoEstudiantes: number;
  profesoraNombre: string;
  totalEstudiantes: number;
}

const Dashboard = () => {
  const currentUserRole = "ADMIN";

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    totalAlumnos: null,
    totalProfesoras: null,
  });

  const [grados, setGrados] = useState<Grado[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resTotalAlumnos, resTotalProfesoras] = await Promise.all([
          axiosClient.get("/alumnos/count"),
          axiosClient.get("/profesoras/count"),
        ]);

        setData({
          totalAlumnos: resTotalAlumnos.data.total,
          totalProfesoras: resTotalProfesoras.data.total,
        });
      } catch (error) {
        console.error("Error al obtener estadísticas:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchGradosConAlumnos = async () => {
      const token =
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhbmRyZXNtZWRpbmE4NDAiLCJpYXQiOjE3NDQ3NDM0NDAsImV4cCI6MTc0NDgyOTg0MH0.OQse3SD3k53eD59J4Zbggwfjuj9PtVzGkJR4eiMkai4";

      try {
        const resGrados = await axiosClient.get("/grados/listaGrados", {
          headers: { Authorization: token },
        });

        const gradosData = resGrados.data.data;

        const gradosConEstudiantes = await Promise.all(
          gradosData.map(async (grado: Grado) => {
            const resCount = await axiosClient.get(
              `/alumnos/count/grado/${grado.id}`,
              {
                headers: { Authorization: token },
              }
            );

            return {
              ...grado,
              totalEstudiantes: resCount.data.total ?? 0,
            };
          })
        );

        setGrados(gradosConEstudiantes);
      } catch (error) {
        console.error("Error al cargar grados:", error);
      }
    };

    if (currentUserRole === "ADMIN") {
      fetchData();
      fetchGradosConAlumnos();
    }
  }, []);

  const renderStatCard = (title: string, value: number | null) => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <Typography variant="h4">{value ?? 0}</Typography>
        )}
      </CardContent>
    </Card>
  );

  return (
    <FusionTemplateColegio>
      <Box>
        <Typography variant="h4" gutterBottom>
          Bienvenido al Dashboard
        </Typography>

        {currentUserRole === "ADMIN" ? (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 2, md: 2 }}>
              {renderStatCard("Total de Alumnos", data.totalAlumnos)}
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              {renderStatCard("Total de Profesoras", data.totalProfesoras)}
            </Grid>

            {/* Sección de Cursos */}
            <Grid size={{ xs: 12 }}>
              <Typography variant="h5" gutterBottom>
                Cursos
              </Typography>
            </Grid>

            <Grid size={{ xs: 12 }} sx={{ overflowX: "auto" }}>
              <Grid
                container
                spacing={2}
                sx={{
                  flexWrap: "nowrap",
                  width: "max-content",
                  minWidth: "100%",
                }}
              >
                {grados.map((grado: Grado) => (
                  <Grid key={grado.id} size={{ xs: 12 }} sx={{ minWidth: 240 }}>
                    <Card sx={{ minHeight: 120 }}>
                      <CardContent>
                        <Typography variant="h6" fontSize={18} fontWeight={600}>
                          {grado.nombre}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Profesora:
                          <br />
                          {grado.profesoraNombre}
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 1 }}>
                          {grado.totalEstudiantes} /{" "}
                          {grado.numeroMaximoEstudiantes}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Typography color="error" variant="body1">
            No tienes permisos para ver estas estadísticas.
          </Typography>
        )}
      </Box>
    </FusionTemplateColegio>
  );
};

export default Dashboard;
