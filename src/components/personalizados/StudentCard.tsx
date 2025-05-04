"use client";

import {
  Paper,
  Typography,
  Grid,
  useTheme,
  useMediaQuery,
  Select,
  MenuItem,
} from "@mui/material";

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
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper
      elevation={3}
      sx={{
        p: { xs: 2, sm: 3 },
        mb: 4,
        borderTop: `4px solid ${theme.palette.primary.main}`,
        borderRadius: "12px",
        backgroundColor: theme.palette.grey[50],
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          border: isMobile ? "none" : 1,
          borderColor: "grey.300",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      > 
        <Grid size={{ xs: 3, md: 3 }} sx={{ borderRight: isMobile ? "none" : 1, borderBottom: 1, p: 2, borderColor: "grey.300" }}>
          <Typography variant="subtitle1" fontWeight="bold">Estudiante:</Typography>
          <Typography variant="body1">{nombre}</Typography>
        </Grid>

        <Grid size={{ xs: 2, md: 2 }} sx={{ borderRight: isMobile ? "none" : 1, borderBottom: 1, p: 2, borderColor: "grey.300" }}>
          <Typography variant="subtitle1" fontWeight="bold">Periodo</Typography>
          <Select
            value={periodo}
            onChange={(e) => onPeriodoChange(e.target.value)}
            fullWidth
            size="small"
            sx={{ mt: 1 }}
          >
            {periodos.map((p) => (
              <MenuItem key={p} value={p}>{p}</MenuItem>
            ))}
          </Select>
        </Grid>

        <Grid size={{ xs: 2, md: 2 }} sx={{ borderBottom: 1, p: 2, borderColor: "grey.300" }}>
          <Typography variant="subtitle1" fontWeight="bold">Fecha de reporte:</Typography>
          <Typography variant="body1">{fechaReporte}</Typography>
        </Grid>

        <Grid size={{ xs: 2, md: 2 }} sx={{ borderRight: isMobile ? "none" : 1, p: 2, borderColor: "grey.300" }}>
          <Typography variant="subtitle1" fontWeight="bold">Grado:</Typography>
          <Typography variant="body1">{grado}</Typography>
        </Grid>

        <Grid size={{ xs: 2, md: 2 }} sx={{ p: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">Directora de grupo:</Typography>
          <Typography variant="body1">{directorGrupo}</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default StudentCard;
