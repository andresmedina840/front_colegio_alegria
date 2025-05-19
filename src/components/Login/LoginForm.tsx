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
import { useAuthStore } from "@/store/authStore";
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
      enqueueSnackbar(
        "Tu sesión ha expirado, por favor inicia sesión nuevamente",
        { variant: "warning" }
      );
      router.replace("/login");
    }
  }, [enqueueSnackbar, router]);

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      console.debug("[Login] Enviando datos de login:", data);

      await axiosClient.post("/v1/api/auth/login", data);

      console.debug(
        "[Login] Login exitoso. Solicitando información del usuario..."
      );

      const response = await axiosClient.get<{
        id: number;
        username: string;
        firstName: string;
        lastName: string;
        email: string;
        role: string; // ← debe ser 'role', no 'roles'
        token: string;
      }>("/v1/api/auth/me");

      console.debug("[Login] Respuesta del endpoint /me:", response.data);

      return response.data;
    },
    onMutate: () => {
      console.debug("[Login] Estado: Loading");
      setIsLoading(true, "Iniciando sesión...");
    },
    onSuccess: (user) => {
      console.debug("[Login] Usuario autenticado:", user);

      login(user); // Guarda el usuario y token en Zustand

      const role = user.role?.trim().toUpperCase();
      console.debug("[Login] Rol detectado:", role);

      const redirectMap: Record<string, string> = {
        ADMIN: "/dashboard/admin",
        PADRE: "/dashboard/padre",
        PROFESOR: "/dashboard/profesor",
      };

      if (role && redirectMap[role]) {
        console.debug(`[Login] Redirigiendo a ${redirectMap[role]}`);
        // Forzar navegación completa para que el middleware actúe correctamente
        window.location.href = redirectMap[role];
      } else {
        console.warn("[Login] Rol no autorizado o no encontrado:", role);
        enqueueSnackbar("Rol no autorizado", { variant: "error" });
      }
    },

    onError: (error: unknown) => {
      console.error("[Login] Error durante el login:", error);

      let errorMessage = "Error al iniciar sesión";

      if (
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof error.response === "object"
      ) {
        const err = error as {
          response?: {
            data?: {
              message?: string;
            };
          };
          message?: string;
        };

        switch (err.response?.data?.message) {
          case "Bad credentials":
            errorMessage = "Usuario o contraseña incorrectos";
            break;
          case "User not found":
            errorMessage = "Usuario no encontrado";
            break;
          case "Account disabled":
            errorMessage = "Cuenta deshabilitada";
            break;
          default:
            errorMessage =
              err.response?.data?.message || err.message || errorMessage;
        }
      }

      enqueueSnackbar(errorMessage, {
        variant: "error",
      });
    },
    onSettled: () => {
      console.debug("[Login] Finalizando carga");
      setIsLoading(false);
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.debug("[Login] Enviando datos de login:", data);
    loginMutation.mutate(data);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(onSubmit)();
    }
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
          padding: 3,
          backgroundColor: "background.paper",
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
              InputProps={{
                inputProps: { maxLength: 30 },
              }}
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
            loginMutation.isPending && (
              <CircularProgress size={20} color="inherit" />
            )
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
