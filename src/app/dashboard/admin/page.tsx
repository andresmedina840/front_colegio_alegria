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
  Chip,
  Stack,
} from "@mui/material";
import axiosClient from "../../axios/axiosClient"; 

const Dashboard = () => {
  const currentUserRole = "ADMIN";

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    totalAlumnos: null,
    alumnosGrado1: null,
    totalProfesoras: null,
    nombresProfesoras: [] as string[],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resTotalAlumnos, resGrado1, resTotalProfesoras, resNombresProfesoras] = await Promise.all([
          axiosClient.get("/alumnos/count"),
          axiosClient.get("/alumnos/count/grado/1"),
          axiosClient.get("/profesoras/count"),
          axiosClient.get("/profesoras/nombres"),
        ]);

        setData({
          totalAlumnos: resTotalAlumnos.data.total,
          alumnosGrado1: resGrado1.data.total,
          totalProfesoras: resTotalProfesoras.data.total,
          nombresProfesoras: resNombresProfesoras.data.nombres,
        });
      } catch (error) {
        console.error("Error al obtener estadísticas:", error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUserRole === "ADMIN") fetchData();
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

  const renderListCard = (title: string, items: string[]) => (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : items.length > 0 ? (
          <Stack spacing={1}>
            {items.map((name, index) => (
              <Chip key={index} label={name} variant="outlined" />
            ))}
          </Stack>
        ) : (
          <Typography>No hay datos disponibles.</Typography>
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
            <Grid item xs={12} sm={6}>
              {renderStatCard("Total de Alumnos", data.totalAlumnos)}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderStatCard("Alumnos en Grado 1", data.alumnosGrado1)}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderStatCard("Total de Profesoras", data.totalProfesoras)}
            </Grid>
            <Grid item xs={12} sm={6}>
              {renderListCard("Nombres de Profesoras", data.nombresProfesoras)}
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
