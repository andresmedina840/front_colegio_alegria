import {
    Card,
    CardContent,
    Grid,
    TextField,
    MenuItem,
    Typography,
  } from "@mui/material";
  import React from "react";
  
  type SituacionAcademicaProps = {
    formData: Record<string, string>;
    handleChange: (
      e: React.ChangeEvent<{ name?: string; value: unknown }>
    ) => void;
    siNo: string[];
  };
  
  const SituacionAcademica: React.FC<SituacionAcademicaProps> = ({
    formData,
    handleChange,
    siNo,
  }) => {
    // Determinar si debemos deshabilitar los demás campos
    const disableOtrosCampos = formData.capacidadesExceptionalesNoAplica === "NO";
    return (
      <Card sx={{ p: 2, mb: 3, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Typography
            variant="h6"
            align="left"
            sx={{ fontWeight: "bold", mb: 3 }}
          >
            Situación académica
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={3}>
              <TextField
                select
                fullWidth
                label="No estudio en la vigencia anterior"
                name="situacionAcademicaNoEstudioVigenciaAnterior"
                value={formData.situacionAcademicaNoEstudioVigenciaAnterior || ""}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              >
                {siNo.map((respuestas) => (
                  <MenuItem key={respuestas} value={respuestas}>
                    {respuestas}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
  
            <Grid item xs={12} sm={3}>
              <TextField
                select
                fullWidth
                label="Aprobó"
                name="situacionAcademicaAprobo"
                value={formData.situacionAcademicaAprobo || ""}
                onChange={handleChange}
                disabled={disableOtrosCampos}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              >
                {siNo.map((respuestas) => (
                  <MenuItem key={respuestas} value={respuestas}>
                    {respuestas}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
  
            <Grid item xs={12} sm={3}>
              <TextField
                select
                fullWidth
                label="Reprobó"
                name="situcionAcademicaReprobo"
                value={formData.situcionAcademicaReprobo || ""}
                onChange={handleChange}
                disabled={disableOtrosCampos}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              >
                {siNo.map((respuestas) => (
                  <MenuItem key={respuestas} value={respuestas}>
                    {respuestas}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
  
            <Grid item xs={12} sm={3}>
              <TextField
                select
                fullWidth
                label="Pendiente de logros"
                name="situacionAcademicaPendienteLogros"
                value={formData.situacionAcademicaPendienteLogros || ""}
                onChange={handleChange}
                disabled={disableOtrosCampos}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              >
                {siNo.map((respuestas) => (
                  <MenuItem key={respuestas} value={respuestas}>
                    {respuestas}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
  
            <Grid item xs={12} sm={3}>
              <TextField
                select
                fullWidth
                label="Viene de otra I.E."
                name="situacionAcademicaVieneOtraIE"
                value={formData.situacionAcademicaVieneOtraIE || ""}
                onChange={handleChange}
                disabled={disableOtrosCampos}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              >
                {siNo.map((respuestas) => (
                  <MenuItem key={respuestas} value={respuestas}>
                    {respuestas}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                select
                fullWidth
                label="Ingresa por primera vez a la I.E."
                name="situcionAcademicaIngresaPrimeraVezIE"
                value={formData.situcionAcademicaIngresaPrimeraVezIE || ""}
                onChange={handleChange}
                disabled={disableOtrosCampos}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              >
                {siNo.map((respuestas) => (
                  <MenuItem key={respuestas} value={respuestas}>
                    {respuestas}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={3}>
              <TextField
                select
                fullWidth
                label="No culminó estudios"
                name="situcionAcademicaNoCulminoEstudios"
                value={formData.situcionAcademicaNoCulminoEstudios || ""}
                onChange={handleChange}
                disabled={disableOtrosCampos}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              >
                {siNo.map((respuestas) => (
                  <MenuItem key={respuestas} value={respuestas}>
                    {respuestas}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };
  
  export default SituacionAcademica;
  