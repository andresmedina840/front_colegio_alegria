'use client';

import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { FormValues } from '@/app/types/formTypes';
import CustomTextField from '../personalizados/CustomTextField';

const determinarNivel = (valoracion?: number | null): string => {
  if (!valoracion) return '';
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
    <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2, mb: 3 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#1976d2' }}>
            {['Materia', 'Estándar', 'Desempeño', 'IH', 'Fallas', 'Valoración', 'Nivel'].map((col) => (
              <TableCell key={col} sx={{ fontWeight: 'bold', color: 'white', textAlign: 'center' }}>
                {col}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {fields.map((field, index) => (
            <TableRow key={field.id} sx={index % 2 ? { backgroundColor: '#f9f9f9' } : {}}>
              <TableCell>{field.nombre}</TableCell>
              <TableCell>
                <CustomTextField name={`materias.${index}.estandar`} label="" />
              </TableCell>
              <TableCell>
                <CustomTextField name={`materias.${index}.desempeno`} label="" />
              </TableCell>
              <TableCell>
                <CustomTextField name={`materias.${index}.intensidadHoraria`} label="" type="number" />
              </TableCell>
              <TableCell>
                <CustomTextField name={`materias.${index}.fallas`} label="" type="number" />
              </TableCell>
              <TableCell>
                <CustomTextField
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
              </TableCell>
              <TableCell align="center">
                {determinarNivel(materias?.[index]?.valoracion)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TablaMaterias;
