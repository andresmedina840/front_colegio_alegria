import { useEffect, useState } from "react";
import api from "../axios/axiosClient";

export interface OpcionSelect {
  id: string;
  nombre: string;
}

const useFetchData = () => {
  const [tiposIdentificacion, setTiposIdentificacion] = useState<OpcionSelect[]>([]);
  const [estratoEconomico, setEstratoEconomico] = useState<OpcionSelect[]>([]);
  const [grados, setGrados] = useState<OpcionSelect[]>([]);
  const [paises, setPaises] = useState<OpcionSelect[]>([]);
  const [departamentos, setDepartamentos] = useState<OpcionSelect[]>([]);
  const [ciudades, setCiudades] = useState<OpcionSelect[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          tiposRes,
          estratoRes,
          gradosRes,
          paisesRes,
        ] = await Promise.all([
          api.get("/tipo-identificacion/tiposDeIdentificacion"),
          api.get("/estratoEconomico/listaEstratoEconomico"),
          api.get("/grados/listaGrados"), // ← requiere token Bearer
          api.get("/ubicacion/paises"),
        ]);

        setTiposIdentificacion(tiposRes.data);
        setEstratoEconomico(estratoRes.data);
        setGrados(gradosRes.data.data); // Asegúrate del formato
        setPaises(paisesRes.data);
      } catch (error) {
        console.error("Error cargando datos generales:", error);
      }
    };

    fetchData();
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
