// src/app/components/boletin/ObservacionesInput.tsx

'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormValues } from '../../types/formTypes';

const ObservacionesInput = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <div className="my-4">
      <label htmlFor="observaciones" className="block font-semibold mb-1">
        Observaciones
      </label>
      <textarea
        id="observaciones"
        {...register('observaciones')}
        rows={4}
        className="w-full border px-2 py-1 rounded"
        placeholder="Escribe observaciones generales del boletín"
      />
      {errors.observaciones && (
        <p className="text-red-600 text-sm mt-1">{errors.observaciones.message}</p>
      )}
    </div>
  );
};

export default ObservacionesInput;
