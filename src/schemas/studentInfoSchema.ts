import { z } from "zod";

// Utilidades para validación
const requiredString = (message: string) => z.string().min(1, { message });
const optionalString = z.string().optional().default("");
const optionalEmail = z.union([
  z.string().email("Correo electrónico inválido"), 
  z.literal("")
]).optional().default("");

// Validación de fecha colombiana (dd/MM/yyyy)
const colombianDateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
const zColombianDate = requiredString("Campo requerido")
  .regex(colombianDateRegex, { message: "Formato inválido (dd/MM/yyyy)" });

// 1. Información de matrícula
const enrollmentInfoSchema = z.object({
  numeroMatricula: optionalString,
  fechaMatricula: zColombianDate,
});

// 2. Información del estudiante
const studentPersonalSchema = z.object({
  tipoIdentificacionEstudianteId: requiredString("Tipo de identificación requerido"),
  numeroIdentificacionEstudiante: requiredString("Número de identificación requerido"),
  primerNombreEstudiante: requiredString("Primer nombre requerido"),
  segundoNombreEstudiante: optionalString.nullable(),
  primerApellidoEstudiante: requiredString("Primer apellido requerido"),
  segundoApellidoEstudiante: optionalString.nullable(),
  generoEstudianteId: requiredString("Género requerido"),
  fechaNacimiento: zColombianDate,
  edad: optionalString,
  paisNacimiento: requiredString("País de nacimiento requerido"),
  departamentoNacimiento: requiredString("Departamento requerido"),
  municipioNacimiento: requiredString("Municipio requerido"),
  sedeMatricula: requiredString("Sede de matrícula requerida"),
  gradoId: requiredString("Grado requerido"),
  pensionId: optionalString,
  jornada: requiredString("Jornada escolar requerida"),
  institucionEducativaAnterior: optionalString,
  ultimoGradoCursado: optionalString,
  ultimoAnioCursado: optionalString,
});

// 3. Afiliación de salud
const healthAffiliationSchema = z.object({
  tipoSangre: optionalString,
  epsAfiliado: optionalString,
  ipsAsignada: optionalString,
  arsAfiliado: optionalString,
  nroCarnetSisben: optionalString,
  nivelSisben: optionalString,
  estrato: optionalString,
});

// 4. Discapacidades
const disabilitiesSchema = z.object({
  discapacidadesNoAplica: optionalString,
  discapacidadesSorderaProfunda: optionalString,
  discapacidadesHipoacusiaBajaVision: optionalString,
  discapacidadesBajaVisionDiagnosticada: optionalString,
  discapacidadesParalisisCerebral: optionalString,
  discapacidadesAutismo: optionalString,
  discapacidadesDeficienciaCognitiva: optionalString,
  discapacidadesSindromeDown: optionalString,
  discapacidadesMultiple: optionalString,
});

// 5. Capacidades excepcionales
const giftedAbilitiesSchema = z.object({
  capacidadesExcepcionalesNoAplica: optionalString,
  capacidadesExcepcionalesSuperdotado: optionalString,
  capacidadesExcepcionalesTalentoCientifico: optionalString,
  capacidadesExcepcionalesTalentoTecnologico: optionalString,
  capacidadesExcepcionalesTalentoSubjetivo: optionalString,
});

// 6. Situación académica
const academicSituationSchema = z.object({
  situacionAcademicaNoEstudioVigenciaAnterior: optionalString,
  situacionAcademicaAprobo: optionalString,
  situacionAcademicaReprobo: optionalString,
  situacionAcademicaPendienteLogros: optionalString,
  situacionAcademicaVieneOtraIE: optionalString,
  situacionAcademicaIngresaPrimeraVezIE: optionalString,
  situacionAcademicaNoCulminoEstudios: optionalString,
});

// 7. Información de padres
const parentsSchema = z.object({
  tipoIdentificacionPadre: optionalString,
  numeroIdentificacionPadre: optionalString,
  primerNombrePadre: optionalString,
  segundoNombrePadre: optionalString.nullable(),
  primerApellidoPadre: optionalString,
  segundoApellidoPadre: optionalString.nullable(),
  direccionPadre: optionalString,
  barrioPadre: optionalString,
  numeroCelularPadre: optionalString,
  ocupacionPadre: optionalString,
  correoElectronicoPadre: optionalEmail,

  tipoIdentificacionMadre: optionalString,
  numeroIdentificacionMadre: optionalString,
  primerNombreMadre: optionalString,
  segundoNombreMadre: optionalString.nullable(),
  primerApellidoMadre: optionalString,
  segundoApellidoMadre: optionalString.nullable(),
  direccionMadre: optionalString,
  barrioMadre: optionalString,
  numeroCelularMadre: optionalString,
  ocupacionMadre: optionalString,
  correoElectronicoMadre: optionalEmail,
});

// 8. Documentación recibida
const documentationSchema = z.object({
  documentacionRecibidaRegistroCivil: optionalString,
  documentacionRecibidaCertificadosEstudios: optionalString,
  documentacionRecibidaFotos: optionalString,
  documentacionRecibidaCertificadoVinculado: optionalString,
  documentacionRecibidaSistemaSocial: optionalString,
  documentacionRecibidaEntidadAseguradora: optionalString,
  documentacionRecibidaSeguroEstudiantil: optionalString,
  documentacionRecibidaCertificadoEstratoSocioeconomico: optionalString,
  documentacionRecibidaPagoSalvo: optionalString,
  documentacionRecibidaRegistroVacunacion: optionalString,
  documentacionRecibidaExamenSerologia: optionalString,
});

// 9. Autorizaciones
const authorizationSchema = z.object({
  autorizacionContactoEmergencia: requiredString("Autorización requerida"),
  autorizacionImagen: requiredString("Autorización requerida"),
  veracidadInformacion: requiredString("Declaración requerida"),
});

// 10. Contacto de emergencia
const emergencyContactSchema = z.object({
  primerNombreEmergencia: optionalString,
  segundoNombreEmergencia: optionalString.nullable(),
  primerApellidoEmergencia: optionalString,
  segundoApellidoEmergencia: optionalString.nullable(),
  telefonoEmergencia: optionalString,
  parentescoEmergencia: optionalString,
});

// 11. Acudientes
const guardianSchema = z.object({
  tipoAcudiente: optionalString,
  primerNombre: optionalString,
  segundoNombre: optionalString.nullable(),
  primerApellido: optionalString,
  segundoApellido: optionalString.nullable(),
  email: optionalEmail,
  telefono: optionalString,
});

// Esquema principal
export const studentInfoSchema = z.object({
  ...enrollmentInfoSchema.shape,
  ...studentPersonalSchema.shape,
  ...healthAffiliationSchema.shape,
  ...disabilitiesSchema.shape,
  ...giftedAbilitiesSchema.shape,
  ...academicSituationSchema.shape,
  ...parentsSchema.shape,
  ...documentationSchema.shape,
  ...authorizationSchema.shape,
  ...emergencyContactSchema.shape,
  acudientes: z.array(guardianSchema).optional().default([]),
}).refine(data => {
  if (data.autorizacionContactoEmergencia === "SI") {
    return !!(
      data.primerNombreEmergencia &&
      data.primerApellidoEmergencia &&
      data.telefonoEmergencia &&
      data.parentescoEmergencia
    );
  }
  return true;
}, {
  message: "Complete todos los campos de contacto de emergencia",
  path: ["primerNombreEmergencia"]
});

export type StudentInfoFormValues = z.infer<typeof studentInfoSchema>;