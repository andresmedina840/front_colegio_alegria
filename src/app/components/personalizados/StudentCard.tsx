'use client';

import { Paper, Typography, Grid, useTheme } from '@mui/material';

interface StudentCardProps {
  nombre: string;
  grado: string;
  periodo: string;
  fechaReporte: string;
  directorGrupo: string;
}

const StudentCard = ({
  nombre,
  grado,
  periodo,
  fechaReporte,
  directorGrupo
}: StudentCardProps) => {
  const theme = useTheme();

  return (
    <Paper 
      elevation={3}
      sx={{
        p: 3,
        mb: 4,
        borderTop: `4px solid ${theme.palette.primary.main}`,
        borderRadius: '8px'
      }}
    >
      <Grid container spacing={2}>
        {/* Contenido del componente */}
      </Grid>
    </Paper>
  );
};

export default StudentCard;