import * as yup from "yup";
import { FormDataType } from "../types/formTypes";

export const studentInfoSchema: yup.ObjectSchema<FormDataType> = yup.object({
  //EnrollmentInfoForm
  numeroMatricula: yup.string().defined(),
  fechaMatricula: yup.string().required("Fecha de matrícula requerida"),

  //StudentInfoForm
  tipoIdentificacionEstudianteId: yup.string().required("Tipo de identificación estudiante requerido"),
  numeroIdentificacionEstudiante: yup.string().required("Número de identificación estudiante requerido"),
  primerNombreEstudiante: yup.string().required("Primer nombre estudiante requerido"),
  segundoNombreEstudiante: yup.string().defined(),
  primerApellidoEstudiante: yup.string().required("Primer apellido estudiante requerido"),
  segundoApellidoEstudiante: yup.string().defined(),
  generoEstudianteId: yup.string().required("Género estudiante requerido"),
  fechaNacimiento: yup.string().required("Fecha de nacimiento estudiante requerida"),
  paisNacimiento: yup.string().required("País de nacimiento estudiante requerido"),
  departamentoNacimiento: yup.string().required("Departamento de nacimiento estudiante requerido"),
  municipioNacimiento: yup.string().required("Municipio de nacimiento estudiante requerido"),
  sedeMatricula: yup.string().required("Sede de matrícula requerida"),
  gradoId: yup.string().required("Grado estudiante requerido"),
  pensionId: yup.string().defined(),
  jornada: yup.string().required("Jornada escolar requerida"),
  institucionEducativaAnterior: yup.string().defined(),
  ultimoGradoCursado: yup.string().defined(),
  ultimoAnioCursado: yup.string().defined(),
  edad: yup.string().defined(),
 
  //HealthAffiliationForm
  tipoSangre: yup.string().defined(),
  epsAfiliado: yup.string().defined(),
  ipsAsignada: yup.string().defined(),
  arsAfiliado: yup.string().defined(),
  nroCarnetSisben: yup.string().defined(),
  nivelSisben: yup.string().defined(),
  estrato: yup.string().defined(),

  //HealthAffiliationForm
  numeroIdentificacionPadre: yup.string().defined(),
  primerNombrePadre: yup.string().defined(),
  segundoNombrePadre: yup.string().defined(),
  primerApellidoPadre: yup.string().defined(),
  segundoApellidoPadre: yup.string().defined(),
  primerNombreMadre: yup.string().defined(),
  segundoNombreMadre: yup.string().defined(),
  primerApellidoMadre: yup.string().defined(),
  segundoApellidoMadre: yup.string().defined(),
  numeroIdentificacionMadre: yup.string().defined(),
  

  autorizacionContactoEmergencia: yup.string().required(),
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
  discapacidad: yup.string().defined(),
  capacidadesExceptionalesNoAplica: yup.string().defined(),
  primerNombreEmergencia: yup.string().defined(),
  segundoNombreEmergencia: yup.string().defined(),
  primerApellidoEmergencia: yup.string().defined(),
  segundoApellidoEmergencia: yup.string().defined(),
  telefonoEmergencia: yup.string().defined(),
  parentescoEmergencia: yup.string().defined(),
  noAplica: yup.string().defined(),
  sorderaProfunda: yup.string().defined(),
  hipoacusiaBajaVision: yup.string().defined(),
  bajaVisionDiagnosticada: yup.string().defined(),
  paralisisCerebral: yup.string().defined(),
  autismo: yup.string().defined(),
  deficienciaCognitiva: yup.string().defined(),
  sindromeDown: yup.string().defined(),
  multiple: yup.string().defined(),
  capacidad_excepcional: yup.string().defined(),
  superdotado: yup.string().defined(),
  talentoCientifico: yup.string().defined(),
  talentoTecnologico: yup.string().defined(),
  talentoSubjetivo: yup.string().defined(),
  noAplicaCapacidad: yup.string().defined(),

  //Autorizacion de Imganes
  autorizacionImagen: yup.string().defined(),

  //Declaracion de veracidad de la informacion
  veracidadInformacion: yup.string().defined(),
});
