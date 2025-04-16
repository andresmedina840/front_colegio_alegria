import { useEffect, useState } from "react";
import api from "../axios/axiosClient";

export interface Grado {
  id: number;
  nombre: string;
  numeroMaximoEstudiantes: number;
  profesoraNombre: string;
}

const useFetchGrados = () => {
  const [grados, setGrados] = useState<Grado[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGrados = async () => {
      try {
        const response = await api.get("/grados/listaGrados");
        setGrados(response.data.data); // ← backend response es { code, data, message }
      } catch (err) {
        console.error("Error al obtener los grados:", err);
        setError("No se pudieron cargar los grados");
      } finally {
        setLoading(false);
      }
    };
    fetchGrados();
  }, []);

  return { grados, loading, error };
};

export default useFetchGrados;
