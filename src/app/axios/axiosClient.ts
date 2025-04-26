import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosError,
  AxiosResponse,
  AxiosHeaders,
} from "axios";

interface UserData {
  token: string;
  id?: number;
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
}

// Configuración mejorada
const axiosClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND
    ? `${process.env.NEXT_PUBLIC_BACKEND}/v1/api`
    : "http://localhost:8080/v1/api",
  timeout: 30000, // Aumentado a 30 segundos
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor de request mejorado
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    if (typeof window !== "undefined") {
      const userData = sessionStorage.getItem("userData");

      if (userData) {
        try {
          const parsedData: UserData = JSON.parse(userData);
          if (parsedData.token) {
            const headers = new AxiosHeaders();
            headers.set("Authorization", `Bearer ${parsedData.token}`);
            config.headers = headers;
            
            // Agregar timestamp para debug
            config.headers['X-Request-Start'] = new Date().getTime();
          }
        } catch (error) {
          console.error("Error parsing user data:", error);
          sessionStorage.removeItem("userData");
        }
      }
    }
    return config;
  },
  (error: AxiosError) => {
    console.error('Error en interceptor de request:', error);
    return Promise.reject(error);
  }
);

// Interceptor de response mejorado
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log de éxito para monitoreo
    const start = response.config.headers?.['X-Request-Start'];
    if (start) {
      const duration = new Date().getTime() - start;
      console.log(`Request a ${response.config.url} completado en ${duration}ms`);
    }
    return response;
  },
  (error: AxiosError) => {
    // Manejo detallado de errores
    if (typeof window !== "undefined") {
      if (error.code === 'ECONNABORTED') {
        console.error('Timeout: La solicitud tardó demasiado');
        // Puedes redirigir a una página de timeout si es necesario
      }

      if (error.response?.status === 401) {
        sessionStorage.removeItem("userData");
        window.location.href = "/login?sessionExpired=true";
      }

      if (error.response?.status === 403) {
        window.location.href = "/unauthorized";
      }
    }

    // Manejo detallado del error
    let errorMessage = "Error de conexión";
    
    if (error.response) {
      const errorData = error.response.data as { message?: string };
      errorMessage = errorData?.message || 
                    error.message || 
                    `Error ${error.response.status}: ${error.response.statusText}`;
    } else if (error.request) {
      errorMessage = "No se recibió respuesta del servidor";
    } else {
      errorMessage = error.message || "Error al configurar la solicitud";
    }

    console.error('Error detallado:', {
      message: errorMessage,
      code: error.code,
      config: error.config,
      stack: error.stack
    });

    return Promise.reject(new Error(errorMessage));
  }
);

// Función utilitaria para manejar timeouts específicos
export const fetchWithCustomTimeout = async (
  url: string,
  config?: InternalAxiosRequestConfig,
  timeout?: number
) => {
  const source = axios.CancelToken.source();
  const timeoutId = setTimeout(() => {
    source.cancel(`Timeout de ${timeout}ms excedido para ${url}`);
  }, timeout || 30000);

  try {
    const response = await axiosClient({
      ...config,
      url,
      cancelToken: source.token
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

export default axiosClient;