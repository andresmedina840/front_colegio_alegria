import {
  Card,
  CardContent,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

type StudentInfoFormProps = {
  formData: Record<string, string>;
  handleChange: (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => void;
  grados: string[];
  jornadaEscolar: string[];
  generos: string[];
};

const StudentInfoForm: React.FC<StudentInfoFormProps> = ({
  formData,
  handleChange,
  grados,
  jornadaEscolar,
  generos,
}) => {
  return (
    <Card sx={{ p: 2, mb: 3, boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography
          variant="h6"
          align="left"
          sx={{ fontWeight: "bold", mb: 3 }}
        >
          Información del estudiante
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Primer Nombre"
              name="primerNombre"
              variant="outlined"
              value={formData.primerNombre || ""}
              onChange={handleChange}
              helperText={`${
                (formData.primerNombre || "").length
              } / 26 caracteres`}
              slotProps={{
                htmlInput: {
                  maxLength: 26,
                },
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Segundo Nombre"
              name="segundoNombre"
              variant="outlined"
              value={formData.segundoNombre || ""}
              onChange={handleChange}
              helperText={`${
                (formData.segundoNombre || "").length
              } / 26 caracteres`}
              slotProps={{
                htmlInput: {
                  maxLength: 26,
                },
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Primer Apellido"
              name="primerApellido"
              variant="outlined"
              value={formData.primerApellido || ""}
              onChange={handleChange}
              helperText={`${
                (formData.primerApellido || "").length
              } / 26 caracteres`}
              slotProps={{
                htmlInput: {
                  maxLength: 26,
                },
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Segundo Apellido"
              name="segundoApellido"
              variant="outlined"
              value={formData.segundoApellido || ""}
              onChange={handleChange}
              helperText={`${
                (formData.segundoApellido || "").length
              } / 26 caracteres`}
              slotProps={{
                htmlInput: {
                  maxLength: 26,
                },
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Sede para donde se matrícula"
              name="sedeMatricula"
              variant="outlined"
              value={formData.sedeMatricula || ""}
              onChange={handleChange}
              helperText={`${
                (formData.sedeMatricula || "").length
              } / 50 caracteres`}
              slotProps={{
                htmlInput: {
                  maxLength: 50,
                },
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              select
              fullWidth
              label="Grado"
              name="grado"
              value={formData.grado}
              onChange={handleChange}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            >
              {grados.map((grado) => (
                <MenuItem key={grado} value={grado}>
                  {grado}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              select
              fullWidth
              label="Jornada Escolar"
              name="jornada"
              value={formData.jornada}
              onChange={handleChange}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            >
              {jornadaEscolar.map((jornada) => (
                <MenuItem key={jornada} value={jornada}>
                  {jornada}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              label="Institución Educativa anterior (si aplica)"
              name="institucionEducativaAnterior"
              variant="outlined"
              value={formData.institucionEducativaAnterior || ""}
              onChange={handleChange}
              helperText={`${
                (formData.institucionEducativaAnterior || "").length
              } / 50 caracteres`}
              slotProps={{
                htmlInput: {
                  maxLength: 50,
                },
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              select
              fullWidth
              label="Último Grado Cursado"
              name="ultimoGradoCursado"
              value={formData.ultimoGradoCursado || ""}
              onChange={handleChange}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            >
              {grados.map((grado) => (
                <MenuItem key={grado} value={grado}>
                  {grado}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              label="Año del último grado cursado"
              name="ultimoAnioCursado"
              variant="outlined"
              value={formData.ultimoAnioCursado || ""}
              onChange={handleChange}
              helperText={`${
                (formData.ultimoAnioCursado || "").length
              } / 4 caracteres`}
              slotProps={{
                htmlInput: {
                  maxLength: 4,
                },
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              select
              fullWidth
              label="Género"
              name="genero"
              value={formData.genero || ""}
              onChange={handleChange}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            >
              {generos.map((gen) => (
                <MenuItem key={gen} value={gen}>
                  {gen}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField
              type="date"
              fullWidth
              label="Fecha de Nacimiento"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              slotProps={{
                inputLabel: { shrink: true },
                htmlInput: { max: new Date().toISOString().split("T")[0] }, // Evitar fechas futuras
              }}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <TextField
              fullWidth
              label="Edad"
              name="edad"
              variant="outlined"
              value={formData.edad}
              slotProps={{
                input: { readOnly: true }, // Bloquear edición manual con nueva sintaxis
                inputLabel: { shrink: true },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Departamento de nacimiento"
              name="departamentoNacimiento"
              value={formData.departamentoNacimiento}
              onChange={handleChange}
              helperText={`${
                (formData.departamentoNacimiento || "").length
              } / 60 caracteres`}
              slotProps={{
                htmlInput: {
                  maxLength: 60,
                },
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={5}>
            <TextField
              fullWidth
              label="Municipio de nacimiento"
              name="municipioNacimiento"
              value={formData.municipioNacimiento}
              onChange={handleChange}
              helperText={`${
                (formData.municipioNacimiento || "").length
              } / 60 caracteres`}
              slotProps={{
                htmlInput: {
                  maxLength: 60,
                },
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StudentInfoForm;
