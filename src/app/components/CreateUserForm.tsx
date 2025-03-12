"use client";

import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { Box, Button, Grid, Typography } from "@mui/material";
import api from "../axios/axiosClient";
import CustomTextField from "../components/personalizados/CustomTextField";
import CustomAutocomplete from "../components/personalizados/CustomAutocomplete";

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
    tipo_identificacion_id: null as OpcionSelect | null,
    numero_identificacion: "",
    numero_celular1: "",
    numero_celular2: "",
    usuario_telegram: "",
    direccion_completa: "",
    ciudad: null as OpcionSelect | null,
    departamento: null as OpcionSelect | null,
    pais: null as OpcionSelect | null,
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
          api.get("/tipo-identificacion/tiposDeIdentificacion"),
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
    if (!formData.pais?.id) return;

    const fetchDepartamentos = async () => {
      try {
        const response = await api.get(
          `/ubicacion/departamentos/${formData.pais?.id}`
        );
        setDepartamentos(response.data);
        setCiudades([]);
      } catch (error) {
        enqueueSnackbar("Error cargando departamentos", { variant: "error" });
      }
    };
    fetchDepartamentos();
  }, [formData.pais]);

  useEffect(() => {
    if (!formData.departamento?.id) return;

    const fetchCiudades = async () => {
      try {
        const response = await api.get(
          `/ubicacion/ciudades/${formData.departamento?.id}`
        );
        setCiudades(response.data);
      } catch (error) {
        enqueueSnackbar("Error cargando ciudades", { variant: "error" });
      }
    };
    fetchCiudades();
  }, [formData.departamento]);

  const handleChange = (name: keyof typeof formData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "pais" && { departamento: null, ciudad: null }),
      ...(name === "departamento" && { ciudad: null }),
    }));
  };

  const handleSubmit = async () => {
    try {
      await api.post("/auth/crearUsuario", {
        ...formData,
        tipo_identificacion_id: formData.tipo_identificacion_id?.id || "",
        pais: formData.pais?.id || "",
        departamento: formData.departamento?.id || "",
        ciudad: formData.ciudad?.id || "",
      });
      enqueueSnackbar("Usuario creado exitosamente", { variant: "success" });
      router.push("/login");
    } catch (error: any) {
      enqueueSnackbar(
        error.response?.data?.message || "Error creando usuario",
        { variant: "error" }
      );
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        margin: "auto",
        p: 3,
        boxShadow: 3,
        backgroundColor: "#fff",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", mb: 3 }}
      >
        Registro de Usuario
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <CustomAutocomplete
            label="Tipo de Identificación"
            options={tiposIdentificacion}
            value={formData.tipo_identificacion_id}
            onChange={(value) => handleChange("tipo_identificacion_id", value)}
            getOptionLabel={(option) => option.nombre}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomTextField
            label="Número Identificación"
            name="numero_identificacion"
            value={formData.numero_identificacion}
            onChange={(e) => handleChange("numero_identificacion", e.target.value)}
            required
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid>

        {[
          { label: "Primer Nombre", name: "primer_nombre", required: true },
          { label: "Segundo Nombre", name: "segundo_nombre" },
          { label: "Primer Apellido", name: "primer_apellido", required: true },
          { label: "Segundo Apellido", name: "segundo_apellido" },
        ].map((field) => (
          <Grid item xs={12} sm={6} key={field.name}>
            <CustomTextField
              label={field.label}
              name={field.name}
              value={formData[field.name as keyof typeof formData]}
              onChange={(e) =>
                handleChange(
                  field.name as keyof typeof formData,
                  e.target.value
                )
              }
              required={field.required}
              uppercase
            />
          </Grid>
        ))}

        <Grid item xs={12} sm={3}>
          <CustomTextField
            label="Fecha de Nacimiento"
            type="date"
            name="fecha_nacimiento"
            value={formData.fecha_nacimiento}
            onChange={(e) => handleChange("fecha_nacimiento", e.target.value)}
            required
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <CustomAutocomplete
            label="País"
            options={paises}
            value={formData.pais}
            onChange={(value) => handleChange("pais", value)}
            getOptionLabel={(option) => option.nombre}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomAutocomplete
            label="Departamento"
            options={departamentos}
            value={formData.departamento}
            onChange={(value) => handleChange("departamento", value)}
            getOptionLabel={(option) => option.nombre}
            disabled={!formData.pais?.id}
            required
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <CustomAutocomplete
            label="Ciudad"
            options={ciudades}
            value={formData.ciudad}
            onChange={(value) => handleChange("ciudad", value)}
            getOptionLabel={(option) => option.nombre}
            disabled={!formData.departamento?.id}
            required
          />
        </Grid>

        <Grid item xs={12} sm={8}>
          <CustomTextField
            label="Dirección Completa"
            name="direccion_completa"
            value={formData.direccion_completa}
            onChange={(e) => handleChange("direccion_completa", e.target.value)}
            required
            uppercase
          />
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
