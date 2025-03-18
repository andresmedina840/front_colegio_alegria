import {
  Card,
  CardContent,
  Grid,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import React from "react";

type DocumentacionRecibidaProps = {
  formData: Record<string, string>;
  handleChange: (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => void;
  siNo: string[];
};

const DocumentacionRecibida: React.FC<DocumentacionRecibidaProps> = ({
  formData,
  handleChange,
  siNo,
}) => {
  return (
    <Card sx={{ p: 2, mb: 3, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography
          variant="h6"
          align="left"
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          Documentación Recibida
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <TextField
              select
              fullWidth
              label="RegistroCivil"
              name="documentacionRecibidaRegistroCivil"
              value={formData.documentacionRecibidaRegistroCivil || ""}
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
              label="Certificafos de Estudios"
              name="documentacionRecibidaCertificadosEstudios"
              value={formData.documentacionRecibidaCertificadosEstudios || ""}
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
              label="Certificado vinculado"
              name="documentacionRecibidaCertificadoVinculado"
              value={formData.documentacionRecibidaCertificadoVinculado || ""}
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
              label="Sistema social"
              name="documentacionRecibidaSistemaSocial"
              value={formData.documentacionRecibidaSistemaSocial || ""}
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
              label="Fotos"
              name="documentacionRecibidaFotos"
              value={formData.documentacionRecibidaFotos || ""}
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
              label="Entidad Aseguradora"
              name="documentacionRecibidaEntidadAseguradora"
              value={formData.documentacionRecibidaEntidadAseguradora || ""}
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
              label="Seguro estudiantil"
              name="documentacionRecibidaSeguroEstudiantil"
              value={formData.documentacionRecibidaSeguroEstudiantil || ""}
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
              label="Certificado Estrato Socioeconómico"
              name="documentacionRecibidaCertificadoEstratoSocioeconomico"
              value={
                formData.documentacionRecibidaCertificadoEstratoSocioeconomico ||
                ""
              }
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
              label="Paz y salvo"
              name="documentacionRecibidaPagoSalvo"
              value={formData.documentacionRecibidaPagoSalvo || ""}
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
              label="Registro de vacunación"
              name="documentacionRecibidaRegistroVacunacion"
              value={formData.documentacionRecibidaRegistroVacunacion || ""}
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
              label="Examen de Serología"
              name="documentacionRecibidaExamenSerologia"
              value={formData.documentacionRecibidaExamenSerologia || ""}
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
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DocumentacionRecibida;
