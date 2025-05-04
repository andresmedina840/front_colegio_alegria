import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from "axios";
import { useAuthStore } from "@/store/authStore";

// Extender la configuración de Axios para incluir metadata
declare module "axios" {
  interface InternalAxiosRequestConfig {
    metadata?: {
      startTime: number;
    };
  }
}

// Tipos genéricos
type ApiResponse<T> = {
  data: T;
  message?: string;
  success: boolean;
};

type ErrorResponse = {
  message: string;
  code?: string;
  status?: number;
};

const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_BACKEND || "http://localhost:3000/api",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    "X-Application": "front_colegio_alegria",
  },
};

const axiosClient: AxiosInstance = axios.create(API_CONFIG);

// Interceptor de Request
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    config.metadata = { startTime: Date.now() };

    return config;
  },
  (error: AxiosError) => {
    console.error("[AXIOS REQUEST ERROR]", error);
    return Promise.reject(error);
  }
);

// Interceptor de Response
axiosClient.interceptors.response.use(
  (response: AxiosResponse<ApiResponse<unknown>>) => {
    const duration = Date.now() - (response.config.metadata?.startTime || 0);
    console.log(`[API] ${response.config.url} (${duration}ms)`);
    return response;
  },
  (error: AxiosError<ErrorResponse>) => {
    const { response, config } = error;
    const duration = Date.now() - (config?.metadata?.startTime || 0);

    const errorData: ErrorResponse = {
      message: response?.data?.message || error.message,
      code: error.code,
      status: response?.status,
    };

    if (response?.status === 401) {
      useAuthStore.getState().logout();
      if (typeof window !== "undefined") {
        window.location.href = "/login?sessionExpired=true";
      }
    }

    console.error(`[API ERROR] ${config?.url} (${duration}ms)`, errorData);

    return Promise.reject(errorData);
  }
);

export const api = {
  get: <T>(url: string, config?: InternalAxiosRequestConfig) =>
    axiosClient.get<ApiResponse<T>>(url, config).then((res) => res.data),

  post: <T>(url: string, data?: Record<string, unknown>, config?: InternalAxiosRequestConfig) =>
    axiosClient.post<ApiResponse<T>>(url, data, config).then((res) => res.data),

  put: <T>(url: string, data?: Record<string, unknown>, config?: InternalAxiosRequestConfig) =>
    axiosClient.put<ApiResponse<T>>(url, data, config).then((res) => res.data),

  delete: <T>(url: string, config?: InternalAxiosRequestConfig) =>
    axiosClient.delete<ApiResponse<T>>(url, config).then((res) => res.data),
};

export default axiosClient;
