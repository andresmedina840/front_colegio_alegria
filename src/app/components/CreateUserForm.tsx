"use client";

import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import api from "../axios/axiosClient";
import CustomTextField from "../components/personalizados/CustomTextField";
import CustomAutocomplete from "../components/personalizados/CustomAutocomplete";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import dayjs from "dayjs";

type OpcionSelect = {
  id: string;
  nombre: string;
  [key: string]: unknown;
};

type FormValues = {
  tipoIdentificacionId: OpcionSelect | null;
  numeroIdentificacion: string;
  username: string;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  email: string;
  password: string;
  confirmPassword: string;
  rol: OpcionSelect;
  fechaNacimiento: string;
  numeroCelular1: string;
  numeroCelular2: string;
  usuarioTelegram: string;
  direccionCompleta: string;
  ciudad: OpcionSelect | null;
  departamento: OpcionSelect | null;
  pais: OpcionSelect | null;
};

const CreateUserForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const [formData, setFormData] = useState<FormValues>({
    tipoIdentificacionId: null,
    numeroIdentificacion: "",
    username: "",
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    email: "",
    password: "",
    confirmPassword: "",
    rol: { id: "PADRE", nombre: "PADRE" },
    fechaNacimiento: "",
    numeroCelular1: "",
    numeroCelular2: "",
    usuarioTelegram: "",
    direccionCompleta: "",
    ciudad: null,
    departamento: null,
    pais: null,
  });

  const [paises, setPaises] = useState<OpcionSelect[]>([]);
  const [departamentos, setDepartamentos] = useState<OpcionSelect[]>([]);
  const [ciudades, setCiudades] = useState<OpcionSelect[]>([]);
  const [tiposIdentificacion, setTiposIdentificacion] = useState<
    OpcionSelect[]
  >([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [edadCalculada, setEdadCalculada] = useState<string>("");

  const listaDeRoles: OpcionSelect[] = [
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
        setFormData((prev) => ({ ...prev, departamento: null, ciudad: null }));
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
        setFormData((prev) => ({ ...prev, ciudad: null }));
      } catch (error) {
        enqueueSnackbar("Error cargando ciudades", { variant: "error" });
      }
    };
    fetchCiudades();
  }, [formData.departamento]);

  useEffect(() => {
    if (formData.fechaNacimiento) {
      const fechaNacimiento = dayjs(formData.fechaNacimiento);
      const hoy = dayjs();

      if (fechaNacimiento.isAfter(hoy)) {
        enqueueSnackbar("La fecha no puede ser futura", { variant: "error" });
        setEdadCalculada("");
        return;
      }

      const edad = hoy.diff(fechaNacimiento, "year");
      setEdadCalculada(`${edad} años`);
    } else {
      setEdadCalculada("");
    }
  }, [formData.fechaNacimiento]);

  const handleChange = (name: keyof FormValues, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "pais" && { departamento: null, ciudad: null }),
      ...(name === "departamento" && { ciudad: null }),
    }));
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formData,
        tipoIdentificacionId: formData.tipoIdentificacionId?.id,
        pais: formData.pais?.id,
        departamento: formData.departamento?.id,
        ciudad: formData.ciudad?.id,
        rol: formData.rol.id,
      };

      await api.post("/auth/crearUsuario", payload);
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
        width: "100%",
        margin: "auto",
        p: 3,
        boxShadow: 3,
        backgroundColor: "#fff",
        maxHeight: "1000vh",
        overflow: "auto",
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

      <Grid container spacing={2} sx={{ maxWidth: 1200, margin: "auto" }}>
        <Grid item xs={12} sm={4}>
          <CustomAutocomplete
            label="Tipo de Identificación"
            options={tiposIdentificacion}
            value={formData.tipoIdentificacionId}
            onChange={(value) => handleChange("tipoIdentificacionId", value)}
            getOptionLabel={(option) => option.nombre}
            required
          />
        </Grid>

        <Grid item xs={12} sm={2}>
          <CustomTextField
            label="Número Identificación"
            value={formData.numeroIdentificacion}
            onChange={(e) => {
              const newValue = e.target.value.slice(0, 15);
              handleChange("numeroIdentificacion", newValue);
            }}
            helperText={`${formData.numeroIdentificacion.length} / 15 caracteres`}
            slotProps={{
              htmlInput: {
                maxLength: 15,
              },
            }}
            required
          />
        </Grid>

        {[
          { name: "primerNombre", label: "Primer Nombre", required: true },
          { name: "segundoNombre", label: "Segundo Nombre" },
          { name: "primerApellido", label: "Primer Apellido", required: true },
          { name: "segundoApellido", label: "Segundo Apellido" },
        ].map((field) => (
          <Grid item xs={12} sm={3} key={field.name}>
            <CustomTextField
              label={field.label}
              value={formData[field.name as keyof FormValues]}
              onChange={(e) => {
                const newValue = e.target.value.slice(0, 20);
                handleChange(field.name as keyof FormValues, newValue);
              }}
              helperText={`${
                (formData[field.name as keyof FormValues] as string).length
              } / 20 caracteres`}
              slotProps={{
                htmlInput: {
                  maxLength: 20,
                },
              }}
              required={field.required}
              uppercase
            />
          </Grid>
        ))}

        <Grid item xs={12} sm={3}>
          <CustomTextField
            label="Fecha de Nacimiento"
            type="date"
            value={formData.fechaNacimiento}
            onChange={(e) => handleChange("fechaNacimiento", e.target.value)}
            required
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <CustomTextField
            label="Edad"
            value={edadCalculada}
            slotProps={{
              input: {
                readOnly: true,
                style: {
                  color: "#666",
                  fontStyle: "italic",
                  cursor: "not-allowed",
                },
              },
            }}
            sx={{
              mt: 0,
              "& .MuiInputBase-root": {
                backgroundColor: "#f5f5f5",
              },
            }}
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

        <Grid item xs={12} sm={4}>
          <CustomAutocomplete
            label="Departamento"
            options={departamentos}
            value={formData.departamento}
            onChange={(value) => handleChange("departamento", value)}
            getOptionLabel={(option) => option.nombre}
            disabled={!formData.pais}
            required
          />
        </Grid>

        <Grid item xs={12} sm={5}>
          <CustomAutocomplete
            label="Ciudad"
            options={ciudades}
            value={formData.ciudad}
            onChange={(value) => handleChange("ciudad", value)}
            getOptionLabel={(option) => option.nombre}
            disabled={!formData.departamento}
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomTextField
            label="Dirección Completa"
            value={formData.direccionCompleta}
            onChange={(e) => {
              const newValue = e.target.value.slice(0, 50);
              handleChange("direccionCompleta", newValue);
            }}
            helperText={`${formData.direccionCompleta.length} / 50 caracteres`}
            slotProps={{
              htmlInput: {
                maxLength: 50,
              },
            }}
            required
            uppercase
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <CustomTextField
            label="Email"
            value={formData.email}
            onChange={(e) => {
              const newValue = e.target.value.slice(0, 50);
              handleChange("email", newValue);
            }}
            helperText={`${formData.email.length} / 50 caracteres`}
            slotProps={{
              htmlInput: {
                maxLength: 50,
              },
            }}
            required
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <CustomTextField
            label="Usuario de Telegram"
            value={formData.usuarioTelegram}
            onChange={(e) => {
              const newValue = e.target.value.slice(0, 30);
              handleChange("usuarioTelegram", newValue);
            }}
            helperText={`${formData.usuarioTelegram.length} / 30 caracteres`}
            slotProps={{
              htmlInput: {
                maxLength: 30,
              },
            }}
            required
          />
        </Grid>

        <Grid item xs={12} sm={3}>
          <CustomTextField
            label="Nombre de Usuario"
            value={formData.username}
            onChange={(e) => {
              const newValue = e.target.value.slice(0, 25);
              handleChange("username", newValue);
            }}
            helperText={`${formData.username.length} / 25 caracteres`}
            slotProps={{
              htmlInput: {
                maxLength: 25,
              },
            }}
            required
          />
        </Grid>

        <Grid item xs={12} sm={2}>
          <CustomTextField
            label="No. celular principal"
            value={formData.numeroCelular1}
            onChange={(e) => {
              const newValue = e.target.value.slice(0, 10);
              handleChange("numeroCelular1", newValue);
            }}
            helperText={`${formData.numeroCelular1.length} / 10 caracteres`}
            slotProps={{
              htmlInput: {
                maxLength: 10,
              },
            }}
            required
          />
        </Grid>

        <Grid item xs={12} sm={2}>
          <CustomTextField
            label="No. celular secundario"
            value={formData.numeroCelular2}
            onChange={(e) => {
              const newValue = e.target.value.slice(0, 10);
              handleChange("numeroCelular2", newValue);
            }}
            helperText={`${formData.numeroCelular2.length} / 10 caracteres`}
            slotProps={{
              htmlInput: {
                maxLength: 10,
              },
            }}
          />
        </Grid>

        <Grid item xs={12} sm={2}>
          <CustomAutocomplete
            label="Rol"
            options={listaDeRoles}
            value={formData.rol}
            onChange={(value) => handleChange("rol", value)}
            getOptionLabel={(option) => option.nombre}
            required
          />
        </Grid>

        {/* Campo de Contraseña */}
        <Grid item xs={12} sm={6}>
          <CustomTextField
            label="Contraseña"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => {
              const newValue = e.target.value.slice(0, 30);
              handleChange("password", newValue);
            }}
            required
            helperText={`${formData.password.length} / 30 caracteres`}
            slotProps={{
              htmlInput: {
                maxLength: 30,
              },
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
              inputLabel: { shrink: true },
            }}
          />
        </Grid>

        {/* Campo de Confirmación de Contraseña */}
        <Grid item xs={12} sm={6}>
          <CustomTextField
            label="Confirmar Contraseña"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) => {
              const newValue = e.target.value.slice(0, 30);
              handleChange("confirmPassword", newValue);
            }}
            required
            error={formData.password !== formData.confirmPassword}
            helperText={
              formData.password !== formData.confirmPassword
                ? "Las contraseñas no coinciden"
                : `${formData.confirmPassword.length} / 30 caracteres`
            }
            slotProps={{
              htmlInput: {
                maxLength: 30,
              },
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      edge="end"
                      aria-label="toggle confirm password visibility"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
              inputLabel: { shrink: true },
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
