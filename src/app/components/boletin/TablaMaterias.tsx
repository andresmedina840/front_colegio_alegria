// src/app/components/boletin/TablaMaterias.tsx

'use client';

import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormValues } from '@/app/types/formTypes';
import CustomTextField from '../personalizados/CustomTextField';

const determinarNivel = (valoracion?: number | null): string => {
  if (valoracion === null || valoracion === undefined || valoracion === 0) return '';
  if (valoracion >= 4.6) return 'SUPERIOR';
  if (valoracion >= 4.0) return 'ALTO';
  if (valoracion >= 2.9) return 'BÁSICO';
  return 'BAJO';
};

const TablaMaterias = () => {
  const { control, watch } = useFormContext<FormValues>();
  const { fields } = useFieldArray({ control, name: 'materias' });
  const materias = watch('materias');

  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Materia</th>
            <th className="p-2 border">Estándar</th>
            <th className="p-2 border">Desempeño</th>
            <th className="p-2 border">IH</th>
            <th className="p-2 border">Fallas</th>
            <th className="p-2 border">Valoración</th>
            <th className="p-2 border">Nivel</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) => (
            <tr key={field.id}>
              <td className="p-2 border">{field.nombre}</td>
              <td className="p-2 border">
                <CustomTextField<FormValues>
                  name={`materias.${index}.estandar`}
                  label=""
                  maxLength={250}
                />
              </td>
              <td className="p-2 border">
                <CustomTextField<FormValues>
                  name={`materias.${index}.desempeno`}
                  label=""
                  maxLength={250}
                />
              </td>
              <td className="p-2 border">
                <CustomTextField<FormValues>
                  name={`materias.${index}.intensidadHoraria`}
                  label=""
                  type="number"
                />
              </td>
              <td className="p-2 border">
                <CustomTextField<FormValues>
                  name={`materias.${index}.fallas`}
                  label=""
                  type="number"
                />
              </td>
              <td className="p-2 border">
                <CustomTextField<FormValues>
                  name={`materias.${index}.valoracion`}
                  label=""
                  type="number"
                  InputProps={{
                    inputProps: {
                      step: 0.1,
                      min: 0,
                      max: 5,
                      inputMode: 'decimal',
                    },
                  }}
                />
              </td>
              <td className="p-2 border text-center">
                {determinarNivel(materias?.[index]?.valoracion)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaMaterias;