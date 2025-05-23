import { useEffect, useState } from "react";
import api from "../axios/axiosClient";

type OpcionSelect = {
  id: string;
  nombre: string;
};

const useFetchData = () => {
  const [tiposIdentificacion, setTiposIdentificacion] = useState<OpcionSelect[]>([]);
  const [estratoEconomico, setEstratoEconomico] = useState<OpcionSelect[]>([]);
  const [grados, setGrados] = useState<OpcionSelect[]>([]);
  const [paises, setPaises] = useState<OpcionSelect[]>([]);
  const [departamentos, setDepartamentos] = useState<OpcionSelect[]>([]);
  const [ciudades, setCiudades] = useState<OpcionSelect[]>([]);

  useEffect(() => {
    const fetchData = async (url: string, setter: React.Dispatch<React.SetStateAction<OpcionSelect[]>>) => {
      try {
        const response = await api.get<OpcionSelect[]>(url);
        setter(response.data);
      } catch (error) {
        console.error(`Error al cargar ${url}: `, error);
      }
    };

    fetchData("/estratoEconomico/listaEstratoEconomico", setEstratoEconomico);
    fetchData("/grados/listaGrados", setGrados);
    fetchData("/tipo-identificacion/tiposDeIdentificacion", setTiposIdentificacion);
    fetchData("/ubicacion/paises", setPaises);
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
