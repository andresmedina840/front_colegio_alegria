// src/axios/axiosClient.ts
import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosResponse,
  AxiosHeaders,
} from "axios";
import { useAuthStore } from "@/store/authStore";

const axiosClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND
    ? `${process.env.NEXT_PUBLIC_BACKEND}`
    : "http://localhost:8080",
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de solicitud con Zustand
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = useAuthStore.getState().token;
      if (token) {
        // Solución para el problema de tipos con los headers
        const headers = new AxiosHeaders();
        headers.set("Content-Type", "application/json");
        headers.set("Authorization", `Bearer ${token}`);
        
        return {
          ...config,
          headers
        };
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Interceptor de respuesta con control global de errores
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (typeof window !== "undefined") {
      const status = error.response?.status;

      if (status === 401) {
        console.warn("[axios] ⚠️ Sesión expirada");
        useAuthStore.getState().logout();
        window.location.href = "/login?sessionExpired=true";
      }

      if (status === 403) {
        console.warn("[axios] 🚫 Acceso prohibido");
        window.location.href = "/unauthorized";
      }
    }

    const message =
      (error.response?.data as { message?: string })?.message ||
      error.message ||
      "Error desconocido";

    return Promise.reject(new Error(message));
  }
);

export default axiosClient;