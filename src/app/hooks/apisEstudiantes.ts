// src/app/hooks/apisEstudiantes.ts
import { useState, useEffect, useCallback } from "react";
import api from "../axios/axiosClient";
import { OpcionSelect } from "../types";

export interface Catalogos {
  tiposIdentificacion: OpcionSelect[];
  estratosEconomico: OpcionSelect[];
  generos: OpcionSelect[];
  paises: OpcionSelect[];
  grados: OpcionSelect[];
  sedes: OpcionSelect[];
  tiposAcudiente: OpcionSelect[];
  loading: boolean;
  error: string | null;
  recargar: () => void;
}

export const useCatalogosEstudiantes = (): Catalogos => {
  const [tiposIdentificacion, setTiposIdentificacion] = useState<OpcionSelect[]>([]);
  const [estratosEconomico, setEstratosEconomico] = useState<OpcionSelect[]>([]);
  const [generos, setGeneros] = useState<OpcionSelect[]>([]);
  const [paises, setPaises] = useState<OpcionSelect[]>([]);
  const [grados, setGrados] = useState<OpcionSelect[]>([]);
  const [sedes, setSedes] = useState<OpcionSelect[]>([]);
  const [tiposAcudiente, setTiposAcudiente] = useState<OpcionSelect[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCatalog = useCallback(
    async (endpoint: string, setter: (data: OpcionSelect[]) => void, label: string) => {
      try {
        const { data } = await api.get(endpoint);
        if (Array.isArray(data)) {
          setter(data);
        } else if (data?.data && Array.isArray(data.data)) {
          setter(data.data);
        } else {
          console.warn(`[Catálogo] ${label}: Formato inesperado`, data);
          setter([]);
        }
      } catch (err) {
        console.error(`[Catálogo] Error al obtener ${label.toLowerCase()}:`, err);
        setError(`No se pudo cargar ${label.toLowerCase()}`);
        setter([]);
      }
    },
    []
  );

  const cargarCatalogos = useCallback(async () => {
    setLoading(true);
    setError(null);
    await Promise.all([
      fetchCatalog("/tipo-identificacion/tiposDeIdentificacion", setTiposIdentificacion, "Tipos de identificación"),
      fetchCatalog("/estratoEconomico/listaEstratoEconomico", setEstratosEconomico, "Estratos económicos"),
      fetchCatalog("/generos", setGeneros, "Géneros"),
      fetchCatalog("/ubicacion/paises", setPaises, "Paises"),
      fetchCatalog("/grados/listaGrados", setGrados, "Grados"),
      fetchCatalog("/sedes", setSedes, "Sedes"),
      fetchCatalog("/tipos-acudiente", setTiposAcudiente, "Tipos de acudiente"),

    ]);
    setLoading(false);
  }, [fetchCatalog]);

  useEffect(() => {
    cargarCatalogos();
  }, [cargarCatalogos]);

  return {
    tiposIdentificacion,
    estratosEconomico,
    generos,
    paises,
    grados,
    sedes,
    tiposAcudiente,
    loading,
    error,
    recargar: cargarCatalogos,
  };
};
