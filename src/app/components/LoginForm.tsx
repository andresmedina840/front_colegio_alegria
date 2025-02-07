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
    setIsLoading(true); // Activa el spinner y desactiva el botón
    try {
      const response = await api.post("/auth/login", formData);
      console.log("Usuario autenticado:", response.data);

      enqueueSnackbar("Inicio de sesión exitoso", { variant: "success" });
      router.push("/dashboard");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message;
      enqueueSnackbar(errorMessage, { variant: "error" });
    } finally {
      setIsLoading(false); // Desactiva el spinner y habilita el botón
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

        <img
          src="/logo-colegio.png" // Ruta del logo
          alt="Logo del Colegio"
          style={{ width: 100, marginBottom: 20 }}
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
