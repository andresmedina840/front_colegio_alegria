'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Card, CardContent, Grid, Typography } from '@mui/material';

export default function PadreDashboard() {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user || user.rol.toUpperCase() !== 'PADRE') {
      router.replace('/');
    }
  }, [user, router]);

  if (!user || user.rol.toUpperCase() !== 'PADRE') return null;

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <Card>
          <CardContent>
            <Typography variant="h5">Rendimiento de Mi Hijo</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Card>
          <CardContent>
            <Typography variant="h5">Asistencia</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }}>
        <Card>
          <CardContent>
            <Typography variant="h5">Comunicados</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
