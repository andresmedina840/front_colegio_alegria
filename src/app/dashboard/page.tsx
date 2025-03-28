"use client";

import React from "react";
import FusionTemplateColegio from "../components/TemplateColegio";
import {
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  CircularProgress,
} from "@mui/material";

// Simulación del rol del usuario actual
const currentUserRole = "ADMIN"; // Esto debería venir de tu sistema de autenticación

const Dashboard = () => {
  // Estado simplificado ya que no estamos usando la API actualmente
  const loading = false;
  const data = {
    estudiantes: 125, // Valores de ejemplo
    profesores: 15,   // Valores de ejemplo
    materias: 30      // Valores de ejemplo
  };

  // Si en el futuro necesitas usar la API, puedes descomentar este código:
  /*
  const [data, setData] = useState({
    estudiantes: null,
    profesores: null,
    materias: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUserRole !== "ADMIN") return;

    const fetchData = async () => {
      try {
        const [estudiantesRes, profesoresRes, materiasRes] = await Promise.all([
          api.get("/estudiantes/year"),
          api.get("/profesores/year"),
          api.get("/materias"),
        ]);

        setData({
          estudiantes: estudiantesRes.data.valor,
          profesores: profesoresRes.data.valor,
          materias: materiasRes.data.valor,
        });
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  */

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
            <Grid item xs={12} sm={4}>
              {renderStatCard("Total de Estudiantes por Año", data.estudiantes)}
            </Grid>
            <Grid item xs={12} sm={4}>
              {renderStatCard("Profesores por Año", data.profesores)}
            </Grid>
            <Grid item xs={12} sm={4}>
              {renderStatCard("Materias Totales", data.materias)}
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