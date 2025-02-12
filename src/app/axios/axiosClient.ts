import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND}/v1/api`,
});

// Interceptor para adjuntar el token en las solicitudes
axiosClient.interceptors.request.use(
  async (request) => {
    try {
      const dataUser = sessionStorage.getItem("dataUser");

      if (dataUser) {
        const parsedData = JSON.parse(dataUser);
        const token = parsedData?.token;

        // Validar si el token es una cadena válida
        if (typeof token === "string" && token.trim() !== "") {
          request.headers["Authorization"] = `Bearer ${token.trim()}`;
        }
      }
    } catch (error) {
      console.error("Error al recuperar el token:", error);
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
