import { Card, CardContent, Grid, MenuItem, Typography } from "@mui/material";
import React from "react";
import CustomTextField from "./personalizados/CustomTextField";
import CustomDatePicker from "./personalizados/CustomDatePicker";
import { getCurrentDateISO }  from "./../utils/dateUtils";

type OpcionSelect = {
  id: string;
  nombre: string;
};

type StudentInfoFormProps = {
  formData: Record<string, string>;
  handleChange: (
    e: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => void;
  grados: OpcionSelect[];
  jornadaEscolar: string[];
  generos: string[];
  paises: OpcionSelect[];
  departamentos: OpcionSelect[];
  ciudades: OpcionSelect[];
  cargarDepartamentos: (paisId: string) => void;
  cargarCiudades: (departamentoId: string) => void;
  tiposIdentificacion: string[];
};

const StudentInfoForm: React.FC<StudentInfoFormProps> = ({
  formData,
  handleChange,
  grados,
  jornadaEscolar,
  generos,
  paises,
  departamentos,
  ciudades,
  cargarDepartamentos,
  cargarCiudades,
  tiposIdentificacion,
}) => {
  const maxDateActual = getCurrentDateISO();

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
          <Grid item xs={12} sm={5}>
            <CustomTextField
              select
              label={`Tipo Identificación Estudiante`}
              name={`tipoIdentificacionEstudiante`}
              value={formData[`tipoIdentificacionEstudiante`]}
              onChange={handleChange}
            >
              <MenuItem value="">Seleccione un tipo de Identificación</MenuItem>
              {tiposIdentificacion.map((tipo) => (
                <MenuItem key={tipo} value={tipo}>
                  {tipo}
                </MenuItem>
              ))}
            </CustomTextField>
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              label="Número Identificación Estudiante"
              name="numeroIdentificacionEstudiante"
              value={formData.numeroIdentificacionEstudiante || ""}
              onChange={handleChange}
              helperText={`${
                (formData[`numeroIdentificacionEstudiante`] || "").length
              } / 50 caracteres`}
              slotProps={{
                htmlInput: {
                  maxLength: 50,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomTextField
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
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
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
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
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
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
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
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
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
              }}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <CustomTextField
              select
              label="Grado"
              name="grado"
              value={formData.grado}
              onChange={handleChange}
            >
              <MenuItem value="">Seleccione un grado</MenuItem>
              {grados.map((grado) => (
                <MenuItem key={grado.id} value={grado.id}>
                  {grado.nombre}
                </MenuItem>
              ))}
            </CustomTextField>
          </Grid>

          <Grid item xs={12} sm={3}>
            <CustomTextField
              select
              label="Jornada Escolar"
              name="jornada"
              value={formData.jornada}
              onChange={handleChange}
            >
              <MenuItem value="">Seleccione una jornada</MenuItem>
              {jornadaEscolar.map((jornada) => (
                <MenuItem key={jornada} value={jornada}>
                  {jornada}
                </MenuItem>
              ))}
            </CustomTextField>
          </Grid>

          <Grid item xs={12} sm={12}>
            <CustomTextField
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
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomTextField
              select
              label="Último Grado Cursado"
              name="ultimoGradoCursado"
              value={formData.ultimoGradoCursado || ""}
              onChange={handleChange}
            >
              {grados.map((grado) => (
                <MenuItem key={grado.id} value={grado.id}>
                  {grado.nombre}
                </MenuItem>
              ))}
            </CustomTextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomTextField
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
              }}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomTextField
              select
              label="Género"
              name="genero"
              value={formData.genero || ""}
              onChange={handleChange}
            >
              {generos.map((gen) => (
                <MenuItem key={gen} value={gen}>
                  {gen}
                </MenuItem>
              ))}
            </CustomTextField>
          </Grid>
          <Grid item xs={12} sm={3}>
            <CustomDatePicker
              label="Fecha de Nacimiento"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              handleChange={handleChange}
              maxDate={maxDateActual}
            />
          </Grid>

          <Grid item xs={12} sm={2}>
            <CustomTextField
              label="Edad"
              name="edad"
              variant="outlined"
              value={formData.edad}
              slotProps={{
                input: { readOnly: true },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <CustomTextField
              label="País de Nacimiento"
              select
              variant="outlined"
              name="paisNacimiento"
              value={formData.paisNacimiento || ""}
              onChange={(e) => {
                handleChange(e);
                cargarDepartamentos(e.target.value as string);
              }}
            >
              <MenuItem value="">Seleccionar país</MenuItem>
              {paises.map((pais) => (
                <MenuItem key={pais.id} value={pais.id}>
                  {pais.nombre}
                </MenuItem>
              ))}
            </CustomTextField>
          </Grid>
          <Grid item xs={12} sm={6}>
            <CustomTextField
              select
              label="Departamento de Nacimiento"
              name="departamentoNacimiento"
              value={formData.departamentoNacimiento || ""}
              onChange={(e) => {
                handleChange(e);
                cargarCiudades(e.target.value as string);
              }}
              disabled={!formData.paisNacimiento}
            >
              <MenuItem value="">Seleccionar departamento</MenuItem>
              {departamentos.map((departamento) => (
                <MenuItem key={departamento.id} value={departamento.id}>
                  {departamento.nombre}
                </MenuItem>
              ))}
            </CustomTextField>
          </Grid>
          <Grid item xs={12} sm={5}>
            <CustomTextField
              select
              label="Municipio de Nacimiento"
              name="municipioNacimiento"
              value={formData.municipioNacimiento || ""}
              onChange={handleChange}
              disabled={!formData.departamentoNacimiento}
            >
              <MenuItem value="">Seleccionar municipio</MenuItem>
              {ciudades.map((ciudad) => (
                <MenuItem key={ciudad.id} value={ciudad.id}>
                  {ciudad.nombre}
                </MenuItem>
              ))}
            </CustomTextField>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StudentInfoForm;
