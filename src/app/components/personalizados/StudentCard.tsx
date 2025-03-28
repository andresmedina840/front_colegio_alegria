"use client";

import { Paper, Typography, Grid, useTheme, Select, MenuItem } from "@mui/material";

interface StudentCardProps {
  nombre: string;
  grado: string;
  periodo: string;
  fechaReporte: string;
  directorGrupo: string;
  onPeriodoChange: (nuevoPeriodo: string) => void;
}

const periodos = ["I", "II", "III", "IV"];

const StudentCard = ({
  nombre,
  grado,
  periodo,
  fechaReporte,
  directorGrupo,
  onPeriodoChange,
}: StudentCardProps) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        mb: 4,
        borderTop: `4px solid ${theme.palette.primary.main}`,
        borderRadius: "8px",
      }}
    >
      <Grid container spacing={2} sx={{ border: 1, borderColor: "black" }}>
        <Grid item xs={6} sx={{ borderRight: 1, borderBottom: 1, p: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">Estudiante:</Typography>
          <Typography variant="body1">{nombre}</Typography>
        </Grid>
        <Grid item xs={3} sx={{ borderRight: 1, borderBottom: 1, p: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">Periodo</Typography>
          <Select
            value={periodo}
            onChange={(e) => onPeriodoChange(e.target.value)}
            fullWidth
            sx={{ mt: 1 }}
          >
            {periodos.map((p) => (
              <MenuItem key={p} value={p}>{p}</MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={3} sx={{ borderBottom: 1, p: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">Fecha de reporte:</Typography>
          <Typography variant="body1">{fechaReporte}</Typography>
        </Grid>

        <Grid item xs={6} sx={{ borderRight: 1, p: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">Grado:</Typography>
          <Typography variant="body1">{grado}</Typography>
        </Grid>
        <Grid item xs={6} sx={{ p: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">Directora de grupo:</Typography>
          <Typography variant="body1">{directorGrupo}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default StudentCard;