"use client";

import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  CircularProgress,
} from "@mui/material";
import api from "../axios/axiosClient"; // Asegúrate de tener configurado tu archivo de servicio API.

// Simulación del rol del usuario actual
const currentUserRole = "ADMIN"; // Cambia este valor según la lógica de autenticación

const Dashboard = () => {
  const [data, setData] = useState({
    estudiantes: null,
    profesores: null,
    materias: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUserRole !== "ADMIN") return; // Evitar llamadas si el usuario no es ADMIN

    const fetchData = async () => {
      try {
        const [estudiantesRes, profesoresRes, materiasRes] = await Promise.all([
          api.get("/estudiantes/year"), // Reemplaza con la ruta correcta de tu API
          api.get("/profesores/year"), // Reemplaza con la ruta correcta de tu API
          api.get("/materias"), // Reemplaza con la ruta correcta de tu API
        ]);

        setData({
          estudiantes: estudiantesRes.data.valor, // Ajusta según la respuesta de tu API
          profesores: profesoresRes.data.valor, // Ajusta según la respuesta de tu API
          materias: materiasRes.data.valor, // Ajusta según la respuesta de tu API
        });
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <Box>
        <Typography variant="h4" gutterBottom>
          Bienvenido al Dashboard
        </Typography>

        {currentUserRole === "ADMIN" ? (
          <Grid container spacing={3}>
            {/* Card de Estudiantes */}
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Estudiantes por Año
                  </Typography>
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <Typography variant="h4">{data.estudiantes ?? 0}</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Card de Profesores */}
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Profesores por Año
                  </Typography>
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <Typography variant="h4">{data.profesores ?? 0}</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Card de Materias */}
            <Grid item xs={12} sm={4}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Materias Totales
                  </Typography>
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <Typography variant="h4">{data.materias ?? 0}</Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        ) : (
          <Typography color="error" variant="body1">
            No tienes permisos para ver estas estadísticas.
          </Typography>
        )}
      </Box>
    </Layout>
  );
};

export default Dashboard;
