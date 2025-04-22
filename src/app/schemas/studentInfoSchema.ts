// src/app/schemas/studentInfoSchema.ts
import * as yup from "yup";
import { FormDataType } from "../types/formTypes";

// Cada parte como un esquema separado
const enrollmentInfoFormSchema = yup.object({
  //numeroMatricula: yup.string().required(),
  fechaMatricula: yup.string().required("Fecha de matrícula requerida"),
});

const StudentInfoFormSchema = yup.object({
  tipoIdentificacionEstudianteId: yup.string().required(),
  numeroIdentificacionEstudiante: yup.string().required(),
  primerNombreEstudiante: yup.string().required(),
  segundoNombreEstudiante: yup.string().defined(),
  primerApellidoEstudiante: yup.string().required(),
  segundoApellidoEstudiante: yup.string().defined(),
  generoEstudianteId: yup.string().required(),
  fechaNacimiento: yup.string().required(),
  edad: yup.string().defined(),
  paisNacimiento: yup.string().required(),
  departamentoNacimiento: yup.string().required(),
  municipioNacimiento: yup.string().required(),
  sedeMatricula: yup.string().required("Sede de matrícula requerida"),
  gradoId: yup
    .string()
    .required("Grado estudiante requerido")
    .notOneOf([""], "Seleccione un grado válido"),
  pensionId: yup.string().defined(),
  jornada: yup.string().required("Jornada escolar requerida"),
  institucionEducativaAnterior: yup.string().defined(),
  ultimoGradoCursado: yup.string().defined(),
  ultimoAnioCursado: yup.string().defined(),
});

const healthAffiliationFormSchema = yup.object({
  tipoSangre: yup.string().defined(),
  epsAfiliado: yup.string().defined(),
  ipsAsignada: yup.string().defined(),
  arsAfiliado: yup.string().defined(),
  nroCarnetSisben: yup.string().defined(),
  nivelSisben: yup.string().defined(),
  estrato: yup.string().defined(),
});

const discapacidadesSchema = yup.object({
  noAplica: yup.string().defined(),
  sorderaProfunda: yup.string().defined(),
  hipoacusiaBajaVision: yup.string().defined(),
  bajaVisionDiagnosticada: yup.string().defined(),
  paralisisCerebral: yup.string().defined(),
  autismo: yup.string().defined(),
  deficienciaCognitiva: yup.string().defined(),
  sindromeDown: yup.string().defined(),
  multiple: yup.string().defined(),
});

const capacidadesExcepcionalesSchema = yup.object({
  noAplicaCapacidad: yup.string().defined(),
  superdotado: yup.string().defined(),
  talentoCientifico: yup.string().defined(),
  talentoTecnologico: yup.string().defined(),
  talentoSubjetivo: yup.string().defined(),
});

const situacionAcademicaSchema = yup.object({
  situacionAcademicaNoEstudioVigenciaAnterior: yup.string().defined(),
  situacionAcademicaAprobo: yup.string().defined(),
  situcionAcademicaReprobo: yup.string().defined(),
  situacionAcademicaPendienteLogros: yup.string().defined(),
  situacionAcademicaVieneOtraIE: yup.string().defined(),
  situcionAcademicaIngresaPrimeraVezIE: yup.string().defined(),
  situcionAcademicaNoCulminoEstudios: yup.string().defined(),
});

const parentInfoSchema = yup.object({
  //Padre
  tipoIdentificacionPadre: yup.string().defined(),
  numeroIdentificacionPadre: yup.string().defined(),
  primerNombrePadre: yup.string().defined(),
  segundoNombrePadre: yup.string().defined(),
  primerApellidoPadre: yup.string().defined(),
  segundoApellidoPadre: yup.string().defined(),

  //Madre
  tipoIdentificacionMadre: yup.string().defined(),
  numeroIdentificacionMadre: yup.string().defined(),
  primerNombreMadre: yup.string().defined(),
  segundoNombreMadre: yup.string().defined(),
  primerApellidoMadre: yup.string().defined(),
  segundoApellidoMadre: yup.string().defined(),
});

const documentationSchema = yup.object({
  documentacionRecibidaRegistroCivil: yup.string().defined(),
  documentacionRecibidaCertificadosEstudios: yup.string().defined(),
  documentacionRecibidaFotos: yup.string().defined(),
  documentacionRecibidaCertificadoVinculado: yup.string().defined(),
  documentacionRecibidaSistemaSocial: yup.string().defined(),
  documentacionRecibidaEntidadAseguradora: yup.string().defined(),
  documentacionRecibidaSeguroEstudiantil: yup.string().defined(),
  documentacionRecibidaCertificadoEstratoSocioeconomico: yup.string().defined(),
  documentacionRecibidaPagoSalvo: yup.string().defined(),
  documentacionRecibidaRegistroVacunacion: yup.string().defined(),
  documentacionRecibidaExamenSerologia: yup.string().defined(),
});

const emergencyContactSchema = yup.object({
  primerNombreEmergencia: yup.string().defined(),
  segundoNombreEmergencia: yup.string().defined(),
  primerApellidoEmergencia: yup.string().defined(),
  segundoApellidoEmergencia: yup.string().defined(),
  telefonoEmergencia: yup.string().defined(),
  parentescoEmergencia: yup.string().defined(),
});

const authorizationsSchema = yup.object({
  autorizacionImagen: yup.string().defined(),
  veracidadInformacion: yup.string().defined(),
  autorizacionContactoEmergencia: yup.string().defined(),
});

const acudienteSchema = yup.object().shape({
  nombre: yup.string().required("Nombre requerido"),
  apellido: yup.string().required("Apellido requerido"),
  email: yup.string().email("Correo inválido").required("Correo requerido"),
  telefono: yup.string().required("Teléfono requerido"),
  tipoAcudiente: yup.string().required("Tipo de acudiente requerido"),
});

// Combinar todos los esquemas
export const studentInfoSchema: yup.ObjectSchema<FormDataType> =
  enrollmentInfoFormSchema
    .concat(StudentInfoFormSchema)
    .concat(healthAffiliationFormSchema)
    .concat(discapacidadesSchema)
    .concat(capacidadesExcepcionalesSchema)
    .concat(situacionAcademicaSchema)
    .concat(parentInfoSchema)
    .concat(emergencyContactSchema)
    .concat(authorizationsSchema)
    .concat(documentationSchema)
    .concat(
      yup.object({
        acudientes: yup.array().of(acudienteSchema).default([]),
      })
    );
