"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { Loader } from "@/components/ui/Loader";
import { Grid } from "@mui/material";

export default function AdminDashboard() {
  const router = useRouter();
  const { user, isAuthenticated, loadFromStorage } = useAuthStore();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Paso 1: Restaurar desde el localStorage
    loadFromStorage();

    // Paso 2: Validar acceso
    const timeout = setTimeout(() => {
      if (!isAuthenticated()) {
        router.replace("/login");
      } else if (user?.role !== "ADMIN") {
        router.replace("/");
      } else {
        setChecking(false);
      }
    }, 100); // Espera corta para cargar el estado desde persistencia

    return () => clearTimeout(timeout);
  }, [isAuthenticated, user, router, loadFromStorage]);

  if (checking) {
    return <Loader open={true} message="Verificando acceso..." />;
  }

  return (
    <Grid container spacing={3}>
      {/* Aquí va tu contenido del dashboard */}
      <Grid size={{ xs: 12 }}>Bienvenido al panel de administración</Grid>
    </Grid>
  );
}
