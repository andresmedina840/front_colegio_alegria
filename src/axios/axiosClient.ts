import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError, AxiosResponse, AxiosHeaders } from "axios";

interface UserData {
  token: string;
  id?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
}

const axiosClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND 
    ? `${process.env.NEXT_PUBLIC_BACKEND}/v1/api` 
    : "http://localhost:8080/v1/api",
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const userData = sessionStorage.getItem("userData");
      
      if (userData) {
        try {
          const parsedData: UserData = JSON.parse(userData);
          if (parsedData.token) {
            // Solución 1: Usar AxiosHeaders
            const headers = new AxiosHeaders();
            headers.set("Authorization", `Bearer ${parsedData.token}`);
            config.headers = headers;
            
            // Solución alternativa (menos tipo-safe pero funciona):
            // config.headers = {
            //   ...config.headers,
            //   Authorization: `Bearer ${parsedData.token}`,
            // } as AxiosHeaders;
          }
        } catch (error) {
          console.error("Error parsing user data:", error);
          sessionStorage.removeItem("userData");
        }
      }
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (typeof window !== "undefined") {
      if (error.response?.status === 401) {
        sessionStorage.removeItem("userData");
        window.location.href = "/login?sessionExpired=true";
      }
      
      if (error.response?.status === 403) {
        window.location.href = "/unauthorized";
      }
    }

    const errorData = error.response?.data as { message?: string };
    const errorMessage = errorData?.message || error.message || "Error de conexión";
    
    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosClient;