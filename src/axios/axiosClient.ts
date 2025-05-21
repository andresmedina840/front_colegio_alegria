import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from "axios";
import { useAuthStore } from "@/store/authStore";

const axiosClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND || "http://localhost:8080",
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const token = useAuthStore.getState().token; // Ahora token existe en el estado
      if (token) {
        config.headers = config.headers || {};
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

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
