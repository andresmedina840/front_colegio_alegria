// src/app/hooks/useCatalogosForm.ts
import { useState, useEffect } from "react";
import api from "../axios/axiosClient";
import { OpcionSelect } from "../types";

export const useCatalogosForm = () => {
  const [tiposIdentificacion, setTiposIdentificacion] = useState<OpcionSelect[]>([]);
  const [estratosEconomico, setEstratosEconomico] = useState<OpcionSelect[]>([]);
  const [generos, setGeneros] = useState<OpcionSelect[]>([]);
  const [paises, setPaises] = useState<OpcionSelect[]>([]);
  const [grados, setGrados] = useState<OpcionSelect[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCatalog = async (
    endpoint: string,
    setter: (data: OpcionSelect[]) => void,
    label: string
  ) => {
    try {
      const { data } = await api.get(endpoint);
      if (Array.isArray(data)) setter(data);
      else if (data?.data && Array.isArray(data.data)) setter(data.data);
      else {
        console.warn(`${label}: formato inesperado`, data);
        setter([]);
      }
    } catch (error) {
      console.error(`Error al obtener ${label.toLowerCase()}:`, error);
      setter([]);
    }
  };

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);
      await Promise.all([
        fetchCatalog("/tipo-identificacion/tiposDeIdentificacion", setTiposIdentificacion, "Tipos de identificación"),
        fetchCatalog("/estratoEconomico/listaEstratoEconomico", setEstratosEconomico, "Estratos económicos"),
        fetchCatalog("/generos", setGeneros, "Géneros"),
        fetchCatalog("/ubicacion/paises", setPaises, "Paises"),
        fetchCatalog("/grados/listaGrados", setGrados, "Grados"),
      ]);
      setLoading(false);
    };

    fetchAll();
  }, []);

  return {
    tiposIdentificacion,
    estratosEconomico,
    generos,
    paises,
    grados,
    loading,
  };
};
