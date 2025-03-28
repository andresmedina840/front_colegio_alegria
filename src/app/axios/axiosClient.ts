import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError, AxiosResponse } from "axios";

interface UserData {
  token: string;
  // Agrega aquí otros campos que tengas en dataUser
}

const axiosClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND ? `${process.env.NEXT_PUBLIC_BACKEND}/v1/api` : "",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de solicitud corregido
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const userData = sessionStorage.getItem("dataUser");
      
      if (userData) {
        try {
          const parsedData: UserData = JSON.parse(userData);
          if (parsedData.token) {
            // Usamos headers común en lugar de AxiosHeaders
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${parsedData.token}`;
          }
        } catch (error) {
          console.error("Error parsing user data:", error);
          sessionStorage.removeItem("dataUser");
        }
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuesta (sin cambios necesarios)
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (typeof window !== "undefined" && error.response?.status === 401) {
      sessionStorage.removeItem("dataUser");
      window.location.href = "/login";
    }
    
    const errorMessage = (error.response?.data as { message?: string })?.message || 
                        error.message || 
                        "Error de conexión";
    
    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosClient;