"use client";

import {
  Box,
  Button,
  Grid,
  Link,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import api from "../axios/axiosClient";

const CreateUserForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    email: "",
    password: "",
    rol: "",
    fechaNacimiento: "", // Se mantiene en formato "yyyy-MM-dd"
    tipoIdentificacionId: "",
    numeroIdentificacion: "",
    numeroCelular1: "",
    numeroCelular2: "",
    usuarioTelegram: "",
    direccionCompleta: "",
    ciudad: "",
    departamento: "",
    pais: "",
  });

  const [tiposIdentificacion, setTiposIdentificacion] = useState([]);
  const [paises, setPaises] = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [ciudades, setCiudades] = useState([]);

  // Cargar tipos de identificación
  useEffect(() => {
    const fetchTiposIdentificacion = async () => {
      try {
        const response = await api.get(
          "/tipo-identificacion/tiposDeIdentificacion"
        );
        setTiposIdentificacion(response.data);
      } catch (error) {
        console.error("Error al cargar tipos de identificación:", error);
      }
    };
    fetchTiposIdentificacion();
  }, []);

  // Cargar países al iniciar
  useEffect(() => {
    const fetchPaises = async () => {
      try {
        const response = await api.get("/ubicacion/paises");
        setPaises(response.data);
      } catch (error) {
        console.error("Error al cargar países:", error);
      }
    };
    fetchPaises();
  }, []);

  // Cargar departamentos cuando se selecciona un país
  useEffect(() => {
    if (formData.pais) {
      const fetchDepartamentos = async () => {
        try {
          const response = await api.get(
            `/ubicacion/departamentos/${formData.pais}`
          );
          setDepartamentos(response.data);
        } catch (error) {
          console.error("Error al cargar departamentos:", error);
        }
      };
      fetchDepartamentos();
    } else {
      setDepartamentos([]);
      setCiudades([]);
    }
  }, [formData.pais]);

  // Cargar ciudades cuando se selecciona un departamento
  useEffect(() => {
    if (formData.departamento) {
      const fetchCiudades = async () => {
        try {
          const response = await api.get(
            `/ubicacion/ciudades/${formData.departamento}`
          );
          setCiudades(response.data);
        } catch (error) {
          console.error("Error al cargar ciudades:", error);
        }
      };
      fetchCiudades();
    } else {
      setCiudades([]);
    }
  }, [formData.departamento]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "fechaNacimiento") {
      // Guardar la fecha en formato "yyyy-MM-dd"
      setFormData({ ...formData, [name]: value });
    } else if (name === "pais") {
      setFormData({ ...formData, pais: value, departamento: "", ciudad: "" });
    } else if (name === "departamento") {
      setFormData({ ...formData, departamento: value, ciudad: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleCreateUser = async () => {
    try {
      // Preparar los datos antes de enviarlos
      const formattedData = {
        ...formData,
        fechaNacimiento: formData.fechaNacimiento
          ? new Date(formData.fechaNacimiento)
              .toLocaleDateString("es-ES")
              .split("/")
              .reverse()
              .join("/")
          : "",
      };

      const response = await api.post("/auth/crearUsuario", formattedData);

      // Mostrar notificación de éxito
      enqueueSnackbar(response.data.message || "Usuario creado exitosamente", {
        variant: "success",
      });

      router.push("/login");
    } catch (error: any) {
      // Manejar errores
      const errorMessage =
        error.response?.data?.message || "Error al crear usuario";
      console.error("Error al crear usuario:", errorMessage);

      // Mostrar notificación de error
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  return (
    <Box
      sx={{
        width: 600,
        padding: 3,
        backgroundColor: "white",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" sx={{ mb: 3 }}>
        Crear Usuario
      </Typography>
      <Grid container spacing={2}>
        {/* Todos los campos del formulario */}
        <Grid item xs={12} sm={4}>
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
        <Grid item xs={12} sm={4}>
          <TextField
            label="Primer Nombre"
            fullWidth
            variant="outlined"
            name="primerNombre"
            value={formData.primerNombre}
            onChange={handleChange}
            helperText={`${formData.primerNombre.length} / 30 caracteres`} 
            slotProps={{
              htmlInput: {
                maxLength: 30, 
              },
              inputLabel: {
                shrink: true,
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Segundo Nombre"
            fullWidth
            variant="outlined"
            name="segundoNombre"
            value={formData.segundoNombre}
            onChange={handleChange}
            helperText={`${formData.segundoNombre.length} / 30 caracteres`} 
            slotProps={{
              htmlInput: {
                maxLength: 30, 
              },
              inputLabel: {
                shrink: true,
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Primer Apellido"
            fullWidth
            variant="outlined"
            name="primerApellido"
            value={formData.primerApellido}
            onChange={handleChange}
            helperText={`${formData.primerApellido.length} / 30 caracteres`} 
            slotProps={{
              htmlInput: {
                maxLength: 30, 
              },
              inputLabel: {
                shrink: true,
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Segundo Apellido"
            fullWidth
            variant="outlined"
            name="segundoApellido"
            value={formData.segundoApellido}
            onChange={handleChange}
            helperText={`${formData.segundoApellido.length} / 30 caracteres`} 
            slotProps={{
              htmlInput: {
                maxLength: 30, 
              },
              inputLabel: {
                shrink: true,
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Rol"
            select
            fullWidth
            variant="outlined"
            name="rol"
            value={formData.rol}
            onChange={handleChange}
          >
            <MenuItem value="ADMIN">ADMIN</MenuItem>
            <MenuItem value="PROFESOR">PROFESOR</MenuItem>
            <MenuItem value="PADRE">PADRE</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Email"
            fullWidth
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
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

        <Grid item xs={12} sm={4}>
          <TextField
            label="Fecha de Nacimiento"
            fullWidth
            variant="outlined"
            name="fechaNacimiento"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.fechaNacimiento}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Tipo de Identificación"
            select
            fullWidth
            variant="outlined"
            name="tipoIdentificacionId"
            value={formData.tipoIdentificacionId}
            onChange={handleChange}
          >
            {tiposIdentificacion.map((pais: any) => (
              <MenuItem key={pais.id} value={pais.id}>
                {pais.nombre}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Número de Identificación"
            fullWidth
            variant="outlined"
            name="numeroIdentificacion"
            value={formData.numeroIdentificacion}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Número Celular 1"
            fullWidth
            variant="outlined"
            name="numeroCelular1"
            value={formData.numeroCelular1}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Número Celular 2"
            fullWidth
            variant="outlined"
            name="numeroCelular2"
            value={formData.numeroCelular2}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Usuario de Telegram"
            fullWidth
            variant="outlined"
            name="usuarioTelegram"
            value={formData.usuarioTelegram}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Dirección Completa"
            fullWidth
            variant="outlined"
            name="direccionCompleta"
            value={formData.direccionCompleta}
            onChange={handleChange}
          />
        </Grid>
        {/* Campo País */}
        <Grid item xs={12} sm={4}>
          <TextField
            label="País"
            select
            fullWidth
            variant="outlined"
            name="pais"
            value={formData.pais}
            onChange={handleChange}
          >
            {paises.map((pais: any) => (
              <MenuItem key={pais.id} value={pais.id}>
                {pais.nombre}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Campo Departamento */}
        <Grid item xs={12} sm={4}>
          <TextField
            label="Departamento"
            select
            fullWidth
            variant="outlined"
            name="departamento"
            value={formData.departamento}
            onChange={handleChange}
            disabled={!formData.pais}
          >
            {departamentos.map((departamento: any) => (
              <MenuItem key={departamento.id} value={departamento.id}>
                {departamento.nombre}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        {/* Campo Ciudad */}
        <Grid item xs={12} sm={4}>
          <TextField
            label="Ciudad"
            select
            fullWidth
            variant="outlined"
            name="ciudad"
            value={formData.ciudad}
            onChange={handleChange}
            disabled={!formData.departamento}
          >
            {ciudades.map((ciudad: any) => (
              <MenuItem key={ciudad.id} value={ciudad.id}>
                {ciudad.nombre}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 3 }}
        onClick={handleCreateUser}
      >
        Crear Usuario
      </Button>
      <Typography variant="body2" sx={{ mt: 2 }}>
        ¿Ya tienes una cuenta?{" "}
        <Link href="/login" color="primary" underline="hover">
          Inicia sesión
        </Link>
      </Typography>
    </Box>
  );
};

export default CreateUserForm;
