"use client";

import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { Box, Button, Grid, Link, MenuItem, Typography } from "@mui/material";
import api from "../axios/axiosClient";
import CustomTextField from "../components/personalizados/CustomTextField";

type OpcionSelect = { id: string; nombre: string };

const CreateUserForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    email: "",
    password: "",
    rol: "PADRE" as "ADMIN" | "PADRE" | "PROFESOR",
    fecha_nacimiento: "",
    tipo_identificacion_id: "",
    numero_identificacion: "",
    numero_celular1: "",
    numero_celular2: "",
    usuario_telegram: "",
    direccion_completa: "",
    ciudad: "",
    departamento: "",
    pais: "",
  });

  const [paises, setPaises] = useState<OpcionSelect[]>([]);
  const [departamentos, setDepartamentos] = useState<OpcionSelect[]>([]);
  const [ciudades, setCiudades] = useState<OpcionSelect[]>([]);
  const [tiposIdentificacion, setTiposIdentificacion] = useState<
    OpcionSelect[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [paisesRes, tiposRes] = await Promise.all([
          api.get("/ubicacion/paises"),
          api.get("/tipo-identificacion/tiposDeIdentificacion", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
        ]);
        setPaises(paisesRes.data);
        setTiposIdentificacion(tiposRes.data);
      } catch (error) {
        enqueueSnackbar("Error cargando datos iniciales", { variant: "error" });
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!formData.pais) {
      setDepartamentos([]);
      setCiudades([]);
      return;
    }

    const fetchDepartamentos = async () => {
      try {
        const response = await api.get(
          `/ubicacion/departamentos/${formData.pais}`
        );
        setDepartamentos(response.data);
        setCiudades([]); // Limpia ciudades cuando cambia el departamento
      } catch (error) {
        enqueueSnackbar("Error cargando departamentos", { variant: "error" });
      }
    };

    fetchDepartamentos();
  }, [formData.pais]);

  useEffect(() => {
    if (!formData.departamento) {
      setCiudades([]);
      return;
    }

    const fetchCiudades = async () => {
      try {
        const response = await api.get(
          `/ubicacion/ciudades/${formData.departamento}`
        );
        setCiudades(response.data);
      } catch (error) {
        enqueueSnackbar("Error cargando ciudades", { variant: "error" });
      }
    };

    fetchCiudades();
  }, [formData.departamento]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "pais" && { departamento: "", ciudad: "" }),
      ...(name === "departamento" && { ciudad: "" }),
    }));
  };

  const handleSubmit = async () => {
    try {
      await api.post("/auth/crearUsuario", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      enqueueSnackbar("Usuario creado exitosamente", { variant: "success" });
      router.push("/login");
    } catch (error: any) {
      enqueueSnackbar(
        error.response?.data?.message || "Error creando usuario",
        {
          variant: "error",
        }
      );
    }
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", p: 3, boxShadow: 3 }}>
      <Typography variant="h4" gutterBottom>
        Registro de Usuario
      </Typography>

      <Grid container spacing={3}>
        {/* Columna Izquierda */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomTextField
                label="Primer Nombre"
                name="primer_nombre"
                value={formData.primer_nombre}
                onChange={handleChange}
                required
                uppercase
              />
            </Grid>

            <Grid item xs={12}>
              <CustomTextField
                label="Segundo Nombre"
                name="segundo_nombre"
                value={formData.segundo_nombre}
                onChange={handleChange}
                uppercase
              />
            </Grid>

            <Grid item xs={12}>
              <CustomTextField
                label="Primer Apellido"
                name="primer_apellido"
                value={formData.primer_apellido}
                onChange={handleChange}
                required
                uppercase
              />
            </Grid>

            <Grid item xs={12}>
              <CustomTextField
                label="Segundo Apellido"
                name="segundo_apellido"
                value={formData.segundo_apellido}
                onChange={handleChange}
                uppercase
              />
            </Grid>

            <Grid item xs={12}>
              <CustomTextField
                label="Fecha Nacimiento"
                type="date"
                name="fecha_nacimiento"
                value={formData.fecha_nacimiento}
                onChange={handleChange}
                required
                slotProps={{ inputLabel: { shrink: true } }}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Columna Derecha */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomTextField
                label="Tipo Identificación"
                select
                name="tipo_identificacion_id"
                value={formData.tipo_identificacion_id}
                onChange={handleChange}
                required
              >
                {tiposIdentificacion.map((tipo) => (
                  <MenuItem key={tipo.id} value={tipo.id}>
                    {tipo.nombre}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>

            <Grid item xs={12}>
              <CustomTextField
                label="Número Identificación"
                name="numero_identificacion"
                value={formData.numero_identificacion}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <CustomTextField
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <CustomTextField
                label="Teléfono Principal"
                name="numero_celular1"
                value={formData.numero_celular1}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <CustomTextField
                label="Teléfono Secundario"
                name="numero_celular2"
                value={formData.numero_celular2}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <CustomTextField
                label="Usuario Telegram"
                name="usuario_telegram"
                value={formData.usuario_telegram}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Sección Inferior */}
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <CustomTextField
                label="País"
                select
                name="pais"
                value={formData.pais}
                onChange={handleChange}
                required
              >
                {paises.map((pais) => (
                  <MenuItem key={pais.id} value={pais.id}>
                    {pais.nombre}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>

            <Grid item xs={12} md={4}>
              <CustomTextField
                label="Departamento"
                select
                name="departamento"
                value={formData.departamento}
                onChange={handleChange}
                disabled={!formData.pais}
                required
              >
                {departamentos.map((dep) => (
                  <MenuItem key={dep.id} value={dep.id}>
                    {dep.nombre}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>

            <Grid item xs={12} md={4}>
              <CustomTextField
                label="Ciudad"
                select
                name="ciudad"
                value={formData.ciudad}
                onChange={handleChange}
                disabled={!formData.departamento}
                required
              >
                {ciudades.map((ciudad) => (
                  <MenuItem key={ciudad.id} value={ciudad.id}>
                    {ciudad.nombre}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>

            <Grid item xs={12}>
              <CustomTextField
                label="Dirección Completa"
                name="direccion_completa"
                value={formData.direccion_completa}
                onChange={handleChange}
                required
                uppercase
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label="Nombre de Usuario"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <CustomTextField
                label="Contraseña"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <CustomTextField
                label="Rol"
                select
                name="rol"
                value={formData.rol}
                onChange={handleChange}
                required
              >
                {["ADMIN", "PADRE", "PROFESOR"].map((rol) => (
                  <MenuItem key={rol} value={rol}>
                    {rol}
                  </MenuItem>
                ))}
              </CustomTextField>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        fullWidth
        onClick={handleSubmit}
        sx={{ mt: 4, py: 2 }}
      >
        Registrar Usuario
      </Button>
    </Box>
  );
};

export default CreateUserForm;
