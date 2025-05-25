import { useEffect, useState } from "react";
import api from "../axios/axiosClient";

type OpcionSelect = {
  id: string;
  nombre: string;
};

type ApiResponse<T> = {
  code: number;
  message: string;
  data: T;
};

const useFetchData = () => {
  const [tiposIdentificacion, setTiposIdentificacion] = useState<OpcionSelect[]>([]);
  const [estratoEconomico, setEstratoEconomico] = useState<OpcionSelect[]>([]);
  const [grados, setGrados] = useState<OpcionSelect[]>([]);
  const [paises, setPaises] = useState<OpcionSelect[]>([]);
  const [departamentos, setDepartamentos] = useState<OpcionSelect[]>([]);
  const [ciudades, setCiudades] = useState<OpcionSelect[]>([]);

  useEffect(() => {
    const fetchData = async (
      url: string,
      setter: React.Dispatch<React.SetStateAction<OpcionSelect[]>>
    ) => {
      try {
        const response = await api.get<ApiResponse<OpcionSelect[]>>(url);
        setter(response.data.data);
      } catch (error) {
        console.error(`Error al cargar ${url}:`, error);
      }
    };

    fetchData("/v1/api/estratoEconomico/listaEstratoEconomico", setEstratoEconomico);
    fetchData("/v1/api/grados/listaGrados", setGrados);
    fetchData("/v1/api/tipo-identificacion/tiposDeIdentificacion", setTiposIdentificacion);
    fetchData("/v1/api/ubicacion/paises", setPaises);
  }, []);

  return {
    tiposIdentificacion,
    estratoEconomico,
    grados,
    paises,
    departamentos,
    ciudades,
    setDepartamentos,
    setCiudades,
  };
};

export default useFetchData;
