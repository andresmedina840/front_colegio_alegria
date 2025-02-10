"use client";

import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import api from "../axios/axiosClient";
import Image from "next/image";

const LoginForm = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", formData);
      console.log("Usuario autenticado:", response.data);
  
      enqueueSnackbar("Inicio de sesión exitoso", { variant: "success" });
      router.push("/dashboard");
    } catch (error: unknown) {
      let errorMessage = "Error al iniciar sesión";
  
      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof error.response === "object" &&
        error.response !== null &&
        "data" in error.response &&
        typeof error.response.data === "object" &&
        error.response.data !== null &&
        "message" in error.response.data &&
        typeof error.response.data.message === "string"
      ) {
        errorMessage = error.response.data.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
  
      enqueueSnackbar(errorMessage, { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };
  

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
        sx={{
          width: 400,
          padding: 3,
          backgroundColor: "white",
          borderRadius: 5,
          boxShadow: 7,
          textAlign: "center",
          zIndex: 1,
          position: "relative",
        }}
      >
        <Typography variant="h5" sx={{ mb: 3 }}>
          Sistema de Gestión Educativa
          <br />
          Colegio Alegría del Norte
        </Typography>

        <Image
          src="/logo-colegio.png"
          alt="Logo del Colegio"
          width={100}
          height={100}
          priority // Carga la imagen más rápido
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
              helperText={`${formData.username.length} / 30 caracteres`}
              slotProps={{
                htmlInput: {
                  maxLength: 30,
                },
              }}
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
              helperText={`${formData.password.length} / 20 caracteres`}
              slotProps={{
                htmlInput: {
                  maxLength: 20,
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
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
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleLogin}
          disabled={isLoading}
          startIcon={
            isLoading ? <CircularProgress size={20} color="inherit" /> : null
          }
        >
          {isLoading ? "Cargando..." : "Iniciar Sesión"}
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
