"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Button,
  Box,
  Typography,
  IconButton,
  InputAdornment,
  CircularProgress,
  Grid,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Image from "next/image";
import axiosClient from "@/axios/axiosClient";
import { useUIStore } from "@/store/uiStore";
import { useAuthStore, User } from "@/store/authStore";
import CustomTextField from "@/components/personalizados/CustomTextField";
import { loginSchema, LoginFormData } from "@/lib/schemas/validation";

export default function LoginForm() {
  const { handleSubmit, control } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const setIsLoading = useUIStore((state) => state.setIsLoading);
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    if (params.get("sessionExpired") === "true") {
      enqueueSnackbar("Tu sesión ha expirado, por favor inicia sesión nuevamente", {
        variant: "warning",
      });
      router.replace("/login");
    }
  }, [enqueueSnackbar, router]);

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData): Promise<User> => {
      console.debug("[Login] ✉️ Enviando datos:", data);

      await axiosClient.post("/v1/api/auth/login", data, {
        withCredentials: true,
      });

      console.debug("[Login] ✅ Login exitoso. Obteniendo usuario...");

      const response = await axiosClient.get("/v1/api/auth/me", {
        withCredentials: true,
      });

      const raw = response.data?.data;

      console.debug("[Login] 🔍 Respuesta de /me:", raw);

      const token = useAuthStore.getState().token ?? "";

      const user: User = {
        id: raw.id,
        username: raw.username,
        firstName: raw.nombreCompleto?.split(" ")[1] ?? "",
        lastName: raw.nombreCompleto?.split(" ")[2] ?? "",
        email: raw.email,
        role: raw.rol,
        token,
      };

      return user;
    },
    onMutate: () => {
      console.debug("[Login] ⌛ Cargando...");
      setIsLoading(true, "Iniciando sesión...");
    },
    onSuccess: (user: User) => {
      console.debug("[Login] ✔️ Usuario autenticado:", user);
      login(user);

      const role = user.role?.trim().toUpperCase();
      const redirectMap: Record<string, string> = {
        ADMIN: "/dashboard/admin",
        PADRE: "/dashboard/padre",
        PROFESOR: "/dashboard/profesor",
      };

      const target = redirectMap[role];
      if (!target) {
        enqueueSnackbar("Rol no autorizado", { variant: "error" });
        return;
      }

      console.debug("[Login] 🧭 Redirigiendo a:", target);
      router.push(target);
    },
    onError: (error: unknown) => {
      console.error("[Login] ❌ Error:", error);
      let errorMessage = "Error al iniciar sesión";

      if (
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof error.message === "string"
      ) {
        if (error.message.includes("Bad credentials")) {
          errorMessage = "Usuario o contraseña incorrectos";
        } else {
          errorMessage = error.message;
        }
      }

      enqueueSnackbar(errorMessage, { variant: "error" });
    },
    onSettled: () => {
      console.debug("[Login] 🌟 Finalizando carga");
      setIsLoading(false);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit(onSubmit)();
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundImage: "url(/background-image.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        component="form"
        onKeyDown={handleKeyPress}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit)();
        }}
        sx={{
          width: { xs: "90%", sm: 400 },
          p: 3,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" component="h1" sx={{ mb: 3, fontWeight: 500 }}>
          Sistema de Gestión Educativa
          <Typography component="span" display="block" variant="subtitle1">
            Colegio Alegría del Norte
          </Typography>
        </Typography>

        <Image
          src="/logo-colegio.png"
          alt="Logo del Colegio"
          width={100}
          height={100}
          priority
          style={{
            marginBottom: 20,
            borderRadius: "50%",
            border: "2px solid #1976d2",
          }}
        />

        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <CustomTextField
              name="username"
              label="Usuario"
              control={control}
              fullWidth
              showCharCount
              maxLength={30}
              InputProps={{ inputProps: { maxLength: 30 } }}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <CustomTextField
              name="password"
              label="Contraseña"
              control={control}
              type={showPassword ? "text" : "password"}
              fullWidth
              showCharCount
              maxLength={20}
              InputProps={{
                inputProps: { maxLength: 20 },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      disabled={loginMutation.isPending}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3, py: 1.5 }}
          disabled={loginMutation.isPending}
          startIcon={
            loginMutation.isPending && <CircularProgress size={20} color="inherit" />
          }
        >
          {loginMutation.isPending ? "Iniciando sesión..." : "Iniciar Sesión"}
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
}
