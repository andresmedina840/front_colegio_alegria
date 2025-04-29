//src/app/boletines\[id]\page.tsx
"use client";

import React, { useEffect, useState, useRef } from "react";
import { CircularProgress, Snackbar, Button } from "@mui/material";
import { useParams } from "next/navigation";
import axiosClient from "@/app/axios/axiosClient";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TablaMaterias from "@/app/components/boletin/TablaMaterias";
import ResumenTotales from "@/app/components/boletin/ResumenTotales";
import ObservacionesInput from "@/app/components/boletin/ObservacionesInput";
import { schema } from "@/app/schemas/formDataSchema";
import { FormValues, Materia, EstudianteInfo } from "@/app/types/formTypes";

interface ApiBoletinResponse {
  estudiante?: EstudianteInfo;
  materias?: Materia[];
  observaciones?: string | null;
  totalHoras?: number;
  totalFallas?: number;
  promedioFinal?: number;
}

// Asegurar que los valores por defecto coincidan exactamente con el esquema Yup
const defaultFormValues = {
  estudiante: {
    id: 0,
    nombre: "",
    gradoId: 0,
    grado: "",
    directorGrupo: "",
    periodo: "",
    fechaReporte: ""
  },
  materias: [],
  observaciones: "", // Cambiado de null a string vacío para coincidir con Yup
  totalHoras: 0,
  totalFallas: 0,
  promedioFinal: 0
};

const PaginaBoletin = () => {
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const params = useParams();
  const id = params.id as string;
  const printRef = useRef<HTMLDivElement>(null);

  const formOptions = {
    resolver: yupResolver(schema),
    mode: "onBlur" as const,
    defaultValues: defaultFormValues
  };

  const methods = useForm<FormValues>(formOptions);
  const { handleSubmit, watch, reset } = methods;

  useEffect(() => {
    const fetchMaterias = async () => {
      try {
        const response = await axiosClient.get<ApiBoletinResponse>(`/boletines/${id}`);
        const data = response.data;

        const formData: FormValues = {
          estudiante: {
            id: data.estudiante?.id ?? 0,
            nombre: data.estudiante?.nombre ?? "",
            gradoId: data.estudiante?.gradoId ?? 0,
            grado: data.estudiante?.grado ?? "",
            directorGrupo: data.estudiante?.directorGrupo ?? "",
            periodo: data.estudiante?.periodo ?? "",
            fechaReporte: data.estudiante?.fechaReporte ?? ""
          },
          materias: data.materias?.map(m => ({
            nombre: m.nombre ?? "",
            estandar: m.estandar ?? null,
            desempeno: m.desempeno ?? null,
            recomendaciones: m.recomendaciones ?? null,
            intensidadHoraria: m.intensidadHoraria ?? 0,
            fallas: m.fallas ?? 0,
            valoracion: m.valoracion ?? 0,
            nivel: m.nivel ?? null
          })) ?? [],
          observaciones: data.observaciones ?? "", // Cambiado de null a string vacío
          totalHoras: data.totalHoras ?? 0,
          totalFallas: data.totalFallas ?? 0,
          promedioFinal: data.promedioFinal ?? 0
        };

        reset(formData);
      } catch (error) {
        console.error("Error al obtener el boletín:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterias();
  }, [id, reset]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await axiosClient.put(`/boletines/${id}`, data);
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error al guardar el boletín:", error);
    }
  };

  const handlePrint = () => {
    if (printRef.current) {
      const printContents = printRef.current.innerHTML;
      const originalContents = document.body.innerHTML;
      
      document.body.innerHTML = printContents;
      window.print();
      document.body.innerHTML = originalContents;
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <div ref={printRef}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>
            Boletín de {watch("estudiante")?.nombre || 'Estudiante'}
          </h1>

          <TablaMaterias />
          <ResumenTotales />
          <ObservacionesInput />

          <div style={{ 
            display: "flex", 
            gap: "1rem", 
            marginTop: "2rem",
            justifyContent: "center",
            paddingBottom: "2rem"
          }}>
            <Button variant="contained" type="submit" size="large">
              Guardar Cambios
            </Button>
            <Button 
              variant="outlined" 
              onClick={handlePrint}
              size="large"
            >
              Imprimir Boletín
            </Button>
          </div>
        </form>
      </div>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message="Boletín guardado exitosamente"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </FormProvider>
  );
};

export default PaginaBoletin;