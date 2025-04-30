'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormValues } from '@/app/types/formTypes';
import { TextField, Paper } from '@mui/material';

const ObservacionesInput = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
      <TextField
        label="Observaciones"
        multiline
        rows={4}
        fullWidth
        {...register('observaciones')}
        error={!!errors.observaciones}
        helperText={errors.observaciones?.message}
      />
    </Paper>
  );
};

export default ObservacionesInput;
