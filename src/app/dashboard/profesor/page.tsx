'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, Grid, Typography } from '@mui/material';

export default function ProfesorDashboard() {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role.toUpperCase() !== 'PROFESOR') {
      router.replace('/');
    }
  }, [user, router]);

  if (!user || user.role.toUpperCase() !== 'PROFESOR') return null;

  return (
    <Grid container spacing={3}>
      
      <Grid size={{ xs: 12, md: 6 }}>
        <Card>
          <CardContent>
            <Typography variant="h5">Mis Clases</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Card>
          <CardContent>
            <Typography variant="h5">Calificaciones Pendientes</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Card>
          <CardContent>
            <Typography variant="h5">Horario</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
