"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSnackbar } from "notistack";
import {
  Box,
  Button,
  Typography,
  Link,
  IconButton,
  InputAdornment,
  CircularProgress,
  Grid,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Image from "next/image";
import api from "../axios/axiosClient";

interface LoginFormData {
  username: string;
  password: string;
}

interface AuthResponse {
  token: string;
  message?: string;
  id?: number;
  username?: string;
  primerNombre?: string;
  primerApellido?: string;
  email?: string;
  rol?: string;
}

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (searchParams.get("sessionExpired") === "true") {
      enqueueSnackbar(
        "Tu sesión ha expirado, por favor inicia sesión nuevamente",
        {
          variant: "warning",
        }
      );
      router.replace("/login");
    }
  }, [searchParams, enqueueSnackbar, router]);

  const handleChange = (field: keyof LoginFormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLogin = async () => {
    if (!formData.username || !formData.password) {
      enqueueSnackbar("Por favor completa todos los campos", {
        variant: "warning",
      });
      return;
    }

    setIsLoading(true);

    try {
      const { data } = await api.post<AuthResponse>("/auth/login", formData);

      const userData = {
        token: data.token,
        id: data.id,
        username: data.username,
        firstName: data.primerNombre,
        lastName: data.primerApellido,
        email: data.email,
        role: data.rol,
      };

      sessionStorage.setItem("userData", JSON.stringify(userData));

      enqueueSnackbar(data.message || "Inicio de sesión exitoso", {
        variant: "success",
        autoHideDuration: 2000,
      });

      switch (data.rol?.toUpperCase()) {
        case "ADMIN":
          router.push("/dashboard/admin");
          break;
        case "PROFESOR":
          router.push("/dashboard/profesor");
          break;
        case "PADRE":
          router.push("/dashboard/padre");
          break;
        default:
          router.push("/dashboard");
      }
    } catch (error: unknown) {
      let errorMessage = "Error al iniciar sesión";

      if (error instanceof Error) {
        switch (error.message) {
          case "Bad credentials":
            errorMessage = "Usuario o contraseña incorrectos";
            break;
          case "User not found":
            errorMessage = "Usuario no encontrado";
            break;
          case "Account disabled":
            errorMessage = "Cuenta deshabilitada";
            break;
          default:
            errorMessage = error.message;
        }
      }

      enqueueSnackbar(errorMessage, {
        variant: "error",
        persist: errorMessage.includes("Error de conexión"),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundImage: "url('/background-image.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        component="form"
        onKeyDown={handleKeyPress}
        sx={{
          width: { xs: "90%", sm: 400 },
          padding: 3,
          backgroundColor: "background.paper",
          borderRadius: 2,
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" component="h1" sx={{ mb: 3, fontWeight: 500 }}>
          Sistema de Gestión Educativa
          <Typography component="span" display="block" variant="subtitle1">
            Colegio Alegría del Norte
          </Typography>
        </Typography>

        <Image
          src="/logo-colegio.png"
          alt="Logo del Colegio"
          width={100}
          height={100}
          priority
          style={{ marginBottom: 20 }}
        />

        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Usuario"
              name="username"
              value={formData.username}
              onChange={(e) => handleChange("username")(e.target.value)}
              disabled={isLoading}
              fullWidth
              inputProps={{ maxLength: 30 }}
              helperText={`${formData.username.length} / 30 caracteres`}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              label="Contraseña"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={(e) => handleChange("password")(e.target.value)}
              disabled={isLoading}
              fullWidth
              inputProps={{ maxLength: 20 }}
              helperText={`${formData.password.length} / 20 caracteres`}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      disabled={isLoading}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 3, py: 1.5 }}
          onClick={handleLogin}
          disabled={isLoading}
          startIcon={
            isLoading && <CircularProgress size={20} color="inherit" />
          }
        >
          {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </Button>

        <Typography variant="body2" sx={{ mt: 2 }}>
          ¿No tienes una cuenta?{" "}
          <Link href="/register" color="primary" underline="hover">
            Regístrate aquí
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginForm;
