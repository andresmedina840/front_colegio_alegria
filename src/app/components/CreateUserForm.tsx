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

// Definir un tipo para las opciones de selección
type OpcionSelect = {
  id: string;
  nombre: string;
};

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
    fechaNacimiento: "",
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

  const [paises, setPaises] = useState<OpcionSelect[]>([]);
  const [departamentos, setDepartamentos] = useState<OpcionSelect[]>([]);
  const [ciudades, setCiudades] = useState<OpcionSelect[]>([]);

  // Cargar países al iniciar
  useEffect(() => {
    const fetchPaises = async () => {
      try {
        const response = await api.get<OpcionSelect[]>("/ubicacion/paises");
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
          const response = await api.get<OpcionSelect[]>(`/ubicacion/departamentos/${formData.pais}`);
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
          const response = await api.get<OpcionSelect[]>(`/ubicacion/ciudades/${formData.departamento}`);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      ...(name === "pais" ? { departamento: "", ciudad: "" } : {}),
      ...(name === "departamento" ? { ciudad: "" } : {}),
    }));
  };

  const handleCreateUser = async () => {
    try {
      const response = await api.post("/auth/crearUsuario", formData);
      enqueueSnackbar(response.data.message || "Usuario creado exitosamente", { variant: "success" });
      router.push("/login");
    } catch (error: unknown) {
      let errorMessage = "Error al crear usuario";

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
            {paises.map((pais) => (
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
            {departamentos.map((departamento) => (
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
            {ciudades.map((ciudad) => (
              <MenuItem key={ciudad.id} value={ciudad.id}>
                {ciudad.nombre}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>

      <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }} onClick={handleCreateUser}>
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
