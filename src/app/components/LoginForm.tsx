'use client';

import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import api from "../services/api";

const LoginForm = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/login', formData);
      console.log('Usuario autenticado:', response.data);

      enqueueSnackbar('Inicio de sesión exitoso', { variant: 'success' });

      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Credenciales incorrectas';
      enqueueSnackbar(errorMessage, { variant: 'error' });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        width: 400,
        padding: 3,
        backgroundColor: "white",
        borderRadius: 2,
        boxShadow: 3,
        textAlign: "center",
        position: "relative",
        backgroundImage: "url(/background-image.jpg)", // Ruta del fondo
        backgroundSize: "cover",
        backgroundPosition: "center",
        margin: "0 auto", // Centrar horizontalmente
      }}
    >
      <Typography variant="h5" sx={{ mb: 3 }}>
        Sistema de Gestión Educativa
        <br />
        Colegio Alegría del Norte
      </Typography>

      {/* Logo del colegio */}
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
            helperText={`${formData.username.length} / 30 caracteres`} // Contador de caracteres
            slotProps={{
              htmlInput: {
                maxLength: 30, // Límite de caracteres con slotProps.htmlInput
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
            helperText={`${formData.password.length} / 20 caracteres`} // Contador de caracteres
            slotProps={{
              htmlInput: {
                maxLength: 20, // Límite de caracteres con slotProps.htmlInput
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
      >
        Iniciar Sesión
      </Button>
      <Typography variant="body2" sx={{ mt: 2 }}>
        ¿No tienes una cuenta?{' '}
        <Link href="/register" color="primary" underline="hover">
          Regístrate aquí
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginForm;
