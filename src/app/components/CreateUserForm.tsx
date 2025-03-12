"use client";

import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { Box, Button, Grid, IconButton, InputAdornment, Typography } from "@mui/material";
import api from "../axios/axiosClient";
import CustomTextField from "../components/personalizados/CustomTextField";
import CustomAutocomplete from "../components/personalizados/CustomAutocomplete";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type OpcionSelect = { id: string; nombre: string };

const CreateUserForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const [formData, setFormData] = useState({
    tipoIdentificacionId: null as OpcionSelect | null,
    numeroIdentificacion: "",
    username: "",
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    email: "",
    password: "",
    confirmPassword: "",
    rol: "PADRE" as "ADMIN" | "PADRE" | "PROFESOR",
    fechaNacimiento: "",
    numeroCelular1: "",
    numeroCelular2: "",
    usuarioTelegram: "",
    direccionCompleta: "",
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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const listaDeRoles = [
    { id: "ADMIN", nombre: "ADMIN" },
    { id: "PADRE", nombre: "PADRE" },
    { id: "PROFESOR", nombre: "PROFESOR" },
  ];

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
        tipoIdentificacionId: formData.tipoIdentificacionId?.id || "",
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
            value={formData.tipoIdentificacionId}
            onChange={(value) => handleChange("tipoIdentificacionId", value)}
            getOptionLabel={(option) => option.nombre}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomTextField
            label="Número Identificación"
            name="numeroIdentificacion"
            value={formData.numeroIdentificacion}
            onChange={(e) =>
              handleChange("numeroIdentificacion", e.target.value)
            }
            required
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid>

        {[
          { label: "Primer Nombre", name: "primerNombre", required: true },
          { label: "Segundo Nombre", name: "segundoNombre" },
          { label: "Primer Apellido", name: "primerApellido", required: true },
          { label: "Segundo Apellido", name: "segundoApellido" },
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
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={(e) => handleChange("fechaNacimiento", e.target.value)}
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
            name="direccionCompleta"
            value={formData.direccionCompleta}
            onChange={(e) => handleChange("direccionCompleta", e.target.value)}
            required
            uppercase
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <CustomTextField
            label="Email"
            name="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomTextField
            label="Usuario de Telegram"
            name="usuarioTelegram"
            value={formData.usuarioTelegram}
            onChange={(e) => handleChange("usuarioTelegram", e.target.value)}
            required
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <CustomTextField
            label="No. celular principal"
            name="numeroCelular1"
            value={formData.numeroCelular1}
            onChange={(e) => handleChange("numeroCelular1", e.target.value)}
            required
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <CustomTextField
            label="No. celular secundario"
            name="numeroCelular2"
            value={formData.numeroCelular2}
            onChange={(e) => handleChange("numeroCelular2", e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomTextField
            label="Nombre de Usuario"
            name="username"
            value={formData.username}
            onChange={(e) => handleChange("username", e.target.value)}
            required
            slotProps={{ inputLabel: { shrink: true } }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomAutocomplete
            label="Rol"
            options={listaDeRoles} 
            value={listaDeRoles.find((r) => r.id === formData.rol) || null} 
            onChange={(value) => handleChange("rol", value?.id || "")}
            getOptionLabel={(option) => option.nombre}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomTextField
            label="Contraseña"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            required
            slotProps={{ inputLabel: { shrink: true } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Campo de confirmación de contraseña */}
        <Grid item xs={12} sm={6}>
          <CustomTextField
            label="Confirmar Contraseña"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
            required
            error={formData.password !== formData.confirmPassword}
            helperText={
              formData.password !== formData.confirmPassword
                ? "Las contraseñas no coinciden"
                : ""
            }
            slotProps={{ inputLabel: { shrink: true } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
        onClick={handleSubmit}
        sx={{ mt: 4, py: 2 }}
      >
        Registrar Usuario
      </Button>
    </Box>
  );
};

export default CreateUserForm;
