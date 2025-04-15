"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSnackbar } from "notistack";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  IconButton,
  InputAdornment,
  CircularProgress,
  Grid,
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

  // Mostrar mensaje si la sesión expiró
  useEffect(() => {
    if (searchParams.get("sessionExpired") === "true") {
      enqueueSnackbar("Tu sesión ha expirado, por favor inicia sesión nuevamente", {
        variant: "warning",
      });
      // Limpiar el parámetro de la URL
      router.replace("/login");
    }
  }, [searchParams, enqueueSnackbar, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    if (!formData.username || !formData.password) {
      enqueueSnackbar("Por favor completa todos los campos", { variant: "warning" });
      return;
    }

    setIsLoading(true);
    
    try {
      const { data } = await api.post<AuthResponse>("/auth/login", formData);
      
      // Guardar todos los datos del usuario
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

      // Redirigir según el rol
      switch(data.rol?.toUpperCase()) {
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
        // Traducir mensajes comunes
        switch(error.message) {
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
          <Grid item xs={12}>
            <TextField
              label="Usuario"
              fullWidth
              variant="outlined"
              name="username"
              value={formData.username}
              onChange={handleChange}
              disabled={isLoading}
              helperText={`${formData.username.length} / 30 caracteres`}
              inputProps={{ maxLength: 30 }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              fullWidth
              variant="outlined"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              helperText={`${formData.password.length} / 20 caracteres`}
              inputProps={{ maxLength: 20 }}
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
          startIcon={isLoading && <CircularProgress size={20} color="inherit" />}
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