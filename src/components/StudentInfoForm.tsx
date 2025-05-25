import {
  Control,
  FieldErrors,
  UseFormRegister,
  Controller,
} from "react-hook-form";
import {
  Grid,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { StudentInfoFormValues } from "@/schemas/studentInfoSchema";
import CustomTextField from "@/components/personalizados/CustomTextField";
import { CustomDatePicker } from "@/components/personalizados/CustomDatePicker";

interface Option {
  id: string;
  nombre: string;
}

interface Props {
  register: UseFormRegister<StudentInfoFormValues>;
  control: Control<StudentInfoFormValues>;
  errors: FieldErrors<StudentInfoFormValues>;
  tiposIdentificacion: Option[];
  generos: Option[];
  grados: Option[];
  paises: Option[];
  departamentos: Option[];
  ciudades: Option[];
}

export default function StudentInfoForm({
  register,
  control,
  errors,
  tiposIdentificacion = [],
  generos = [],
  grados = [],
  paises = [],
  departamentos = [],
  ciudades = [],
}: Props) {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Información del Estudiante
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        {/* Tipo de identificacion */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="tipoIdentificacionEstudianteId"
            control={control}
            rules={{ required: "Tipo de identificación requerido" }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.tipoIdentificacionEstudianteId}>
                <InputLabel id="tipo-identificacion-label">Tipo de identificación</InputLabel>
                <Select
                  {...field}
                  labelId="tipo-identificacion-label"
                  label="Tipo de identificación"
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
            )}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField
            name="numeroIdentificacionEstudiante"
            label="Número de identificación"
            control={control}
            required
            error={!!errors.numeroIdentificacionEstudiante}
            helperText={errors.numeroIdentificacionEstudiante?.message}
          />
        </Grid>

        {/* Primer y Segundo Nombre */}
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField
            name="primerNombreEstudiante"
            label="Primer nombre"
            control={control}
            required
            error={!!errors.primerNombreEstudiante}
            helperText={errors.primerNombreEstudiante?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField
            name="segundoNombreEstudiante"
            label="Segundo nombre"
            control={control}
            error={!!errors.segundoNombreEstudiante}
            helperText={errors.segundoNombreEstudiante?.message}
          />
        </Grid>

        {/* Primer y Segundo Apellido */}
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField
            name="primerApellidoEstudiante"
            label="Primer apellido"
            control={control}
            required
            error={!!errors.primerApellidoEstudiante}
            helperText={errors.primerApellidoEstudiante?.message}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField
            name="segundoApellidoEstudiante"
            label="Segundo apellido"
            control={control}
            error={!!errors.segundoApellidoEstudiante}
            helperText={errors.segundoApellidoEstudiante?.message}
          />
        </Grid>

        {/* Género */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="generoEstudianteId"
            control={control}
            rules={{ required: "Género requerido" }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.generoEstudianteId}>
                <InputLabel id="genero-label">Género</InputLabel>
                <Select {...field} labelId="genero-label" label="Género">
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
            )}
          />
        </Grid>

        {/* Fecha de nacimiento */}
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomDatePicker
            name="fechaNacimiento"
            label="Fecha de nacimiento"
            control={control}
            errors={errors}
            required
          />
        </Grid>

        {/* Grado */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Controller
            name="gradoId"
            control={control}
            rules={{ required: "Grado requerido" }}
            render={({ field }) => (
              <FormControl fullWidth error={!!errors.gradoId}>
                <InputLabel id="grado-label">Grado</InputLabel>
                <Select {...field} labelId="grado-label" label="Grado">
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
            )}
          />
        </Grid>

        {/* Jornada */}
        <Grid size={{ xs: 12, md: 6 }}>
          <CustomTextField
            name="jornada"
            label="Jornada escolar"
            control={control}
            required
            error={!!errors.jornada}
            helperText={errors.jornada?.message}
          />
        </Grid>
      </Grid>
    </>
  );
}
