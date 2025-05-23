"use client";

import {
  Control,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import {
  Grid,
  Typography,
  Divider,
  TextField,
  MenuItem,
  InputLabel,
  FormControl,
  Select,
} from "@mui/material";
import { StudentInfoFormValues } from "@/schemas/studentInfoSchema";

interface StudentInfoFormProps {
  register: UseFormRegister<StudentInfoFormValues>;
  errors: FieldErrors<StudentInfoFormValues>;
  control: Control<StudentInfoFormValues>;
  tiposIdentificacion: { id: string; nombre: string }[];
  generos: { id: string; nombre: string }[];
  grados: { id: string; nombre: string }[];
  paises: { id: string; nombre: string }[];
  departamentos: { id: string; nombre: string }[];
  ciudades: { id: string; nombre: string }[];
}

export function StudentInfoForm({
  register,
  errors,
  tiposIdentificacion,
  generos,
  grados,
  paises,
  departamentos,
  ciudades,
}: StudentInfoFormProps) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Información del Estudiante
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        {/* Tipo y número de identificación */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth error={!!errors.tipoIdentificacionEstudianteId}>
            <InputLabel id="tipo-identificacion-label">Tipo de identificación</InputLabel>
            <Select
              labelId="tipo-identificacion-label"
              label="Tipo de identificación"
              {...register("tipoIdentificacionEstudianteId")}
            >
              {tiposIdentificacion.map((tipo) => (
                <MenuItem key={tipo.id} value={tipo.id}>
                  {tipo.nombre}
                </MenuItem>
              ))}
            </Select>
            {errors.tipoIdentificacionEstudianteId && (
              <Typography variant="caption" color="error">
                {errors.tipoIdentificacionEstudianteId.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Número de identificación"
            {...register("numeroIdentificacionEstudiante")}
            error={!!errors.numeroIdentificacionEstudiante}
            helperText={errors.numeroIdentificacionEstudiante?.message}
          />
        </Grid>

        {/* Nombres */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Primer nombre"
            {...register("primerNombreEstudiante")}
            error={!!errors.primerNombreEstudiante}
            helperText={errors.primerNombreEstudiante?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Segundo nombre"
            {...register("segundoNombreEstudiante")}
            error={!!errors.segundoNombreEstudiante}
            helperText={errors.segundoNombreEstudiante?.message}
          />
        </Grid>

        {/* Apellidos */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Primer apellido"
            {...register("primerApellidoEstudiante")}
            error={!!errors.primerApellidoEstudiante}
            helperText={errors.primerApellidoEstudiante?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Segundo apellido"
            {...register("segundoApellidoEstudiante")}
            error={!!errors.segundoApellidoEstudiante}
            helperText={errors.segundoApellidoEstudiante?.message}
          />
        </Grid>

        {/* Género y fecha de nacimiento */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth error={!!errors.generoEstudianteId}>
            <InputLabel id="genero-label">Género</InputLabel>
            <Select
              labelId="genero-label"
              label="Género"
              {...register("generoEstudianteId")}
            >
              {generos.map((genero) => (
                <MenuItem key={genero.id} value={genero.id}>
                  {genero.nombre}
                </MenuItem>
              ))}
            </Select>
            {errors.generoEstudianteId && (
              <Typography variant="caption" color="error">
                {errors.generoEstudianteId.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Fecha de nacimiento (dd/MM/yyyy)"
            {...register("fechaNacimiento")}
            error={!!errors.fechaNacimiento}
            helperText={errors.fechaNacimiento?.message}
          />
        </Grid>

        {/* Lugar de nacimiento */}
        <Grid size={{ xs: 12, sm: 4 }}>
          <FormControl fullWidth error={!!errors.paisNacimiento}>
            <InputLabel id="pais-nacimiento-label">País de nacimiento</InputLabel>
            <Select
              labelId="pais-nacimiento-label"
              label="País de nacimiento"
              {...register("paisNacimiento")}
            >
              {paises.map((pais) => (
                <MenuItem key={pais.id} value={pais.id}>
                  {pais.nombre}
                </MenuItem>
              ))}
            </Select>
            {errors.paisNacimiento && (
              <Typography variant="caption" color="error">
                {errors.paisNacimiento.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <FormControl fullWidth error={!!errors.departamentoNacimiento}>
            <InputLabel id="departamento-nacimiento-label">Departamento</InputLabel>
            <Select
              labelId="departamento-nacimiento-label"
              label="Departamento"
              {...register("departamentoNacimiento")}
              disabled={!departamentos.length}
            >
              {departamentos.map((depto) => (
                <MenuItem key={depto.id} value={depto.id}>
                  {depto.nombre}
                </MenuItem>
              ))}
            </Select>
            {errors.departamentoNacimiento && (
              <Typography variant="caption" color="error">
                {errors.departamentoNacimiento.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <FormControl fullWidth error={!!errors.municipioNacimiento}>
            <InputLabel id="municipio-nacimiento-label">Municipio</InputLabel>
            <Select
              labelId="municipio-nacimiento-label"
              label="Municipio"
              {...register("municipioNacimiento")}
              disabled={!ciudades.length}
            >
              {ciudades.map((ciudad) => (
                <MenuItem key={ciudad.id} value={ciudad.id}>
                  {ciudad.nombre}
                </MenuItem>
              ))}
            </Select>
            {errors.municipioNacimiento && (
              <Typography variant="caption" color="error">
                {errors.municipioNacimiento.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        {/* Información académica */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <FormControl fullWidth error={!!errors.gradoId}>
            <InputLabel id="grado-label">Grado</InputLabel>
            <Select
              labelId="grado-label"
              label="Grado"
              {...register("gradoId")}
            >
              {grados.map((grado) => (
                <MenuItem key={grado.id} value={grado.id}>
                  {grado.nombre}
                </MenuItem>
              ))}
            </Select>
            {errors.gradoId && (
              <Typography variant="caption" color="error">
                {errors.gradoId.message}
              </Typography>
            )}
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Jornada"
            {...register("jornada")}
            error={!!errors.jornada}
            helperText={errors.jornada?.message}
          />
        </Grid>

        {/* Información adicional */}
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Institución educativa anterior"
            {...register("institucionEducativaAnterior")}
            error={!!errors.institucionEducativaAnterior}
            helperText={errors.institucionEducativaAnterior?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 3 }}>
          <TextField
            fullWidth
            label="Último grado cursado"
            {...register("ultimoGradoCursado")}
            error={!!errors.ultimoGradoCursado}
            helperText={errors.ultimoGradoCursado?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 3 }}>
          <TextField
            fullWidth
            label="Último año cursado"
            {...register("ultimoAnioCursado")}
            error={!!errors.ultimoAnioCursado}
            helperText={errors.ultimoAnioCursado?.message}
          />
        </Grid>
      </Grid>
    </>
  );
}
