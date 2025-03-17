import axios from "axios";

// Configuración base del cliente HTTP
const axiosClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND}/v1/api`,
  timeout: 10000, // 10 segundos de timeout
});

// Interceptor para agregar token de autenticación
axiosClient.interceptors.request.use(
  (config) => {
    const userData = sessionStorage.getItem("dataUser");
    
    if (userData) {
      try {
        const { token }: { token: string } = JSON.parse(userData);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores globales
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Manejo de errores 401 (No autorizado)
    if (error.response?.status === 401) {
      sessionStorage.removeItem("dataUser");
      window.location.href = "/login";
    }
    
    // Manejo genérico de errores
    const errorMessage = error.response?.data?.message || "Error de conexión";
    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosClient;