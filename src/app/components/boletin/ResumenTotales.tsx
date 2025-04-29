// src/app/components/boletin/ResumenTotales.tsx

'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormValues } from '@/app/types/formTypes';

const ResumenTotales = () => {
  const { watch } = useFormContext<FormValues>();
  const materias = watch('materias') || [];

  const totalHoras = materias.reduce((acc, m) => acc + (Number(m.intensidadHoraria) || 0), 0);
  const totalFallas = materias.reduce((acc, m) => acc + (Number(m.fallas) || 0), 0);
  const notasValidas = materias.filter((m) => m.valoracion > 0);
  const promedioFinal =
    notasValidas.length > 0
      ? notasValidas.reduce((acc, m) => acc + m.valoracion, 0) / notasValidas.length
      : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
      <div>
        <strong>Total Horas:</strong> {totalHoras}
      </div>
      <div>
        <strong>Total Fallas:</strong> {totalFallas}
      </div>
      <div>
        <strong>Promedio Final:</strong> {promedioFinal.toFixed(2)}
      </div>
    </div>
  );
};

export default ResumenTotales;