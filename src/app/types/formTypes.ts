// src/app/types/formTypes.ts
export interface EnrollmentInfoForm {
  fechaMatricula: string;
}

export interface StudentInfoForm {
  tipoIdentificacionEstudianteId: string;
  numeroIdentificacionEstudiante: string;
  primerNombreEstudiante: string;
  segundoNombreEstudiante: string;
  primerApellidoEstudiante: string;
  segundoApellidoEstudiante: string;
  generoEstudianteId: string;
  fechaNacimiento: string;
  edad: string;
  paisNacimiento: string;
  departamentoNacimiento: string;
  municipioNacimiento: string;
  sedeMatricula: string;
  gradoId: string;
  pensionId: string;
  jornada: string;
  institucionEducativaAnterior: string;
  ultimoGradoCursado: string;
  ultimoAnioCursado: string;
}

export interface HealthAffiliationForm {
  tipoSangre: string;
  epsAfiliado: string;
  ipsAsignada: string;
  arsAfiliado: string;
  nroCarnetSisben: string;
  nivelSisben: string;
  estrato: string;
}

export interface CondicionesEspeciales {
  //Discapacidades
  noAplica: string;
  sorderaProfunda: string;
  hipoacusiaBajaVision: string;
  bajaVisionDiagnosticada: string;
  paralisisCerebral: string;
  autismo: string;
  deficienciaCognitiva: string;
  sindromeDown: string;
  multiple: string;

  //CapacidadesExcepcionales
  noAplicaCapacidad: string;
  superdotado: string;
  talentoCientifico: string;
  talentoTecnologico: string;
  talentoSubjetivo: string;
}

export interface SituacionAcademica {
  situacionAcademicaNoEstudioVigenciaAnterior: string;
  situacionAcademicaAprobo: string;
  situcionAcademicaReprobo: string;
  situacionAcademicaPendienteLogros: string;
  situacionAcademicaVieneOtraIE: string;
  situcionAcademicaIngresaPrimeraVezIE: string;
  situcionAcademicaNoCulminoEstudios: string;
}

export interface ParentsInfo {
  //Padre
  tipoIdentificacionPadre: string;
  numeroIdentificacionPadre: string;
  primerNombrePadre: string;
  segundoNombrePadre: string;
  primerApellidoPadre: string;
  segundoApellidoPadre: string;

  //Madre
  tipoIdentificacionMadre: string;
  numeroIdentificacionMadre: string;
  primerNombreMadre: string;
  segundoNombreMadre: string;
  primerApellidoMadre: string;
  segundoApellidoMadre: string;
}

export interface DocumentacionRecibida {
  documentacionRecibidaRegistroCivil: string;
  documentacionRecibidaCertificadosEstudios: string;
  documentacionRecibidaFotos: string;
  documentacionRecibidaCertificadoVinculado: string;
  documentacionRecibidaSistemaSocial: string;
  documentacionRecibidaEntidadAseguradora: string;
  documentacionRecibidaSeguroEstudiantil: string;
  documentacionRecibidaCertificadoEstratoSocioeconomico: string;
  documentacionRecibidaPagoSalvo: string;
  documentacionRecibidaRegistroVacunacion: string;
  documentacionRecibidaExamenSerologia: string;
}

export interface Authorization {
  autorizacionContactoEmergencia: string;
  autorizacionImagen: string;
  veracidadInformacion: string;
}

export interface EmergencyContact {
  primerNombreEmergencia: string;
  segundoNombreEmergencia: string;
  primerApellidoEmergencia: string;
  segundoApellidoEmergencia: string;
  telefonoEmergencia: string;
  parentescoEmergencia: string;
}

export interface FormDataType extends
  EnrollmentInfoForm,
  StudentInfoForm,
  HealthAffiliationForm,
  CondicionesEspeciales,
  SituacionAcademica,
  DocumentacionRecibida,
  ParentsInfo,
  EmergencyContact,
  Authorization {}
