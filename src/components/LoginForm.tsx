'use client';

import { Box, Button, Grid, TextField, Typography, Link } from '@mui/material';
import { useState } from 'react';
import api from '../services/api';
import { useRouter } from 'next/router';

const LoginForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/login', formData);
      console.log('Usuario autenticado:', response.data);
      setErrorMessage('');
      // Redirigir a una página protegida o dashboard
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Error al iniciar sesión:', error.response?.data || error.message);
      setErrorMessage('Credenciales incorrectas');
    }
  };

  return (
    <Box
      sx={{
        width: 400,
        padding: 3,
        backgroundColor: 'white',
        borderRadius: 2,
        boxShadow: 3,
        textAlign: 'center',
      }}
    >
      <Typography variant="h5" sx={{ mb: 3 }}>
        Iniciar Sesión
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Usuario"
            fullWidth
            variant="outlined"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            variant="outlined"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      {errorMessage && (
        <Typography color="error" variant="body2" sx={{ mt: 2 }}>
          {errorMessage}
        </Typography>
      )}
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
