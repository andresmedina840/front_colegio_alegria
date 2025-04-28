// src/app/schemas/studentInfoSchema.ts
import * as yup from "yup";
import { FormDataType } from "../types/formTypes";

// 1. Esquema de información de matrícula
const enrollmentInfoFormSchema = yup.object({
  fechaMatricula: yup.string().required("Fecha de matrícula requerida"),
});

// 2. Esquema de información del estudiante
const StudentInfoFormSchema = yup.object({
  tipoIdentificacionEstudianteId: yup.string().required("Tipo de identificación requerido"),
  numeroIdentificacionEstudiante: yup.string().required("Número de identificación requerido"),
  primerNombreEstudiante: yup.string().required("Primer nombre requerido"),
  segundoNombreEstudiante: yup.string().nullable().optional(),
  primerApellidoEstudiante: yup.string().required("Primer apellido requerido"),
  segundoApellidoEstudiante: yup.string().nullable().optional(),
  generoEstudianteId: yup.string().required("Género requerido"),
  fechaNacimiento: yup.string().required("Fecha de nacimiento requerida"),
  edad: yup.string().optional(),
  paisNacimiento: yup.string().required("País de nacimiento requerido"),
  departamentoNacimiento: yup.string().required("Departamento requerido"),
  municipioNacimiento: yup.string().required("Municipio requerido"),
  sedeMatricula: yup.string().required("Sede de matrícula requerida"),
  gradoId: yup.string().required("Grado requerido").notOneOf([""], "Seleccione un grado válido"),
  pensionId: yup.string().optional(),
  jornada: yup.string().required("Jornada escolar requerida"),
  institucionEducativaAnterior: yup.string().optional(),
  ultimoGradoCursado: yup.string().optional(),
  ultimoAnioCursado: yup.string().optional(),
});

// 3. Esquema de afiliación de salud
const healthAffiliationFormSchema = yup.object({
  tipoSangre: yup.string().optional(),
  epsAfiliado: yup.string().optional(),
  ipsAsignada: yup.string().optional(),
  arsAfiliado: yup.string().optional(),
  nroCarnetSisben: yup.string().optional(),
  nivelSisben: yup.string().optional(),
  estrato: yup.string().optional(),
});

// 4. Esquema de discapacidades
const discapacidadesSchema = yup.object({
  discapacidadesNoAplica: yup.string().optional().default("NO"),
  discapacidadesSorderaProfunda: yup.string().optional().default("NO"),
  discapacidadesHipoacusiaBajaVision: yup.string().optional().default("NO"),
  discapacidadesBajaVisionDiagnosticada: yup.string().optional().default("NO"),
  discapacidadesParalisisCerebral: yup.string().optional().default("NO"),
  discapacidadesAutismo: yup.string().optional().default("NO"),
  discapacidadesDeficienciaCognitiva: yup.string().optional().default("NO"),
  discapacidadesSindromeDown: yup.string().optional().default("NO"),
  discapacidadesMultiple: yup.string().optional().default("NO"),
});

// 5. Esquema de capacidades excepcionales
const capacidadesExcepcionalesSchema = yup.object({
  capacidadesExcepcionalesNoAplica: yup.string().optional().default("NO"),
  capacidadesExcepcionalesSuperdotado: yup.string().optional().default("NO"),
  capacidadesExcepcionalesTalentoCientifico: yup.string().optional().default("NO"),
  capacidadesExcepcionalesTalentoTecnologico: yup.string().optional().default("NO"),
  capacidadesExcepcionalesTalentoSubjetivo: yup.string().optional().default("NO"),
});

// 6. Esquema de situación académica
const situacionAcademicaSchema = yup.object({
  situacionAcademicaNoEstudioVigenciaAnterior: yup.string().optional().default("NO"),
  situacionAcademicaAprobo: yup.string().optional().default("NO"),
  situacionAcademicaReprobo: yup.string().optional().default("NO"),
  situacionAcademicaPendienteLogros: yup.string().optional().default("NO"),
  situacionAcademicaVieneOtraIE: yup.string().optional().default("NO"),
  situacionAcademicaIngresaPrimeraVezIE: yup.string().optional().default("NO"),
  situacionAcademicaNoCulminoEstudios: yup.string().optional().default("NO"),
});

// 7. Esquema de información de padres
const parentsInfoSchema = yup.object({
  // Padre
  tipoIdentificacionPadre: yup.string().optional(),
  numeroIdentificacionPadre: yup.string().optional(),
  primerNombrePadre: yup.string().optional(),
  segundoNombrePadre: yup.string().nullable().optional(),
  primerApellidoPadre: yup.string().optional(),
  segundoApellidoPadre: yup.string().nullable().optional(),
  direccionPadre: yup.string().optional(),
  barrioPadre: yup.string().optional(),
  numeroCelularPadre: yup.string().optional(),
  ocupacionPadre: yup.string().optional(),
  correoElectronicoPadre: yup.string().email("Correo electrónico inválido").optional(),

  // Madre
  tipoIdentificacionMadre: yup.string().optional(),
  numeroIdentificacionMadre: yup.string().optional(),
  primerNombreMadre: yup.string().optional(),
  segundoNombreMadre: yup.string().nullable().optional(),
  primerApellidoMadre: yup.string().optional(),
  segundoApellidoMadre: yup.string().nullable().optional(),
  direccionMadre: yup.string().optional(),
  barrioMadre: yup.string().optional(),
  numeroCelularMadre: yup.string().optional(),
  ocupacionMadre: yup.string().optional(),
  correoElectronicoMadre: yup.string().email("Correo electrónico inválido").optional(),
});

// 8. Esquema de documentación recibida
const documentacionRecibidaSchema = yup.object({
  documentacionRecibidaRegistroCivil: yup.string().optional().default("NO"),
  documentacionRecibidaTarjetaIdentidad: yup.string().optional().default("NO"),
  documentacionRecibidaCertificadosEstudios: yup.string().optional().default("NO"),
  documentacionRecibidaFotos: yup.string().optional().default("NO"),
  documentacionRecibidaCertificadoVinculado: yup.string().optional().default("NO"),
  documentacionRecibidaSistemaSocial: yup.string().optional().default("NO"),
  documentacionRecibidaEntidadAseguradora: yup.string().optional().default("NO"),
  documentacionRecibidaSeguroEstudiantil: yup.string().optional().default("NO"),
  documentacionRecibidaCertificadoEstratoSocioeconomico: yup.string().optional().default("NO"),
  documentacionRecibidaPagoSalvo: yup.string().optional().default("NO"),
  documentacionRecibidaRegistroVacunacion: yup.string().optional().default("NO"),
  documentacionRecibidaExamenSerologia: yup.string().optional().default("NO"),
});

// 9. Esquema de autorizaciones
const authorizationSchema = yup.object({
  autorizacionContactoEmergencia: yup.string().required("Autorización requerida"),
  autorizacionImagen: yup.string().required("Autorización requerida"),
  veracidadInformacion: yup.string().required("Declaración requerida"),
});

// 10. Esquema de contacto de emergencia
const emergencyContactSchema = yup.object({
  primerNombreEmergencia: yup.string()
    .when('autorizacionContactoEmergencia', {
      is: (value: string) => value === 'SI',
      then: (schema) => schema.required("Nombre de contacto requerido"),
      otherwise: (schema) => schema.optional()
    }),
  segundoNombreEmergencia: yup.string().nullable().optional(),
  primerApellidoEmergencia: yup.string()
    .when('autorizacionContactoEmergencia', {
      is: (value: string) => value === 'SI',
      then: (schema) => schema.required("Apellido de contacto requerido"),
      otherwise: (schema) => schema.optional()
    }),
  segundoApellidoEmergencia: yup.string().nullable().optional(),
  telefonoEmergencia: yup.string()
    .when('autorizacionContactoEmergencia', {
      is: (value: string) => value === 'SI',
      then: (schema) => schema.required("Teléfono de contacto requerido"),
      otherwise: (schema) => schema.optional()
    }),
  parentescoEmergencia: yup.string()
    .when('autorizacionContactoEmergencia', {
      is: (value: string) => value === 'SI',
      then: (schema) => schema.required("Parentesco requerido"),
      otherwise: (schema) => schema.optional()
    }),
});


// 11. Esquema de acudientes
const acudienteSchema = yup.object().shape({
  tipoAcudienteId: yup.string().optional(),
  primerNombre: yup.string().optional(),
  segundoNombre: yup.string().nullable().optional(),
  primerApellido: yup.string().optional(),
  segundoApellido: yup.string().nullable().optional(),
  email: yup.string().email("Correo inválido").optional(),
  telefono: yup.string().optional(),
});

// 12. Combinación de todos los esquemas
export const studentInfoSchema: yup.ObjectSchema<FormDataType> = yup.object().shape({
  // Información de matrícula
  ...enrollmentInfoFormSchema.fields,
  
  // Información del estudiante
  ...StudentInfoFormSchema.fields,
  
  // Afiliación de salud
  ...healthAffiliationFormSchema.fields,
  
  // Discapacidades
  ...discapacidadesSchema.fields,
  
  // Capacidades excepcionales
  ...capacidadesExcepcionalesSchema.fields,
  
  // Situación académica
  ...situacionAcademicaSchema.fields,
  
  // Información de padres
  ...parentsInfoSchema.fields,
  
  // Documentación recibida
  ...documentacionRecibidaSchema.fields,
  
  // Autorizaciones
  ...authorizationSchema.fields,
  
  // Contacto de emergencia
  ...emergencyContactSchema.fields,
  
  // Acudientes (opcional)
  acudientes: yup.array().of(acudienteSchema).optional().default(undefined),
}) as yup.ObjectSchema<FormDataType>;

// Tipo derivado para los valores del formulario
export type StudentInfoFormValues = yup.InferType<typeof studentInfoSchema>;