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
  discapacidadesNoAplica: string;
  discapacidadesSorderaProfunda: string;
  discapacidadesHipoacusiaBajaVision: string;
  discapacidadesBajaVisionDiagnosticada: string;
  discapacidadesParalisisCerebral: string;
  discapacidadesAutismo: string;
  discapacidadesDeficienciaCognitiva: string;
  discapacidadesSindromeDown: string;
  discapacidadesMultiple: string;

  //CapacidadesExcepcionales
  capacidadesExcepcionalesNoAplicaCapacidad: string;
  capacidadesExcepcionalesSuperdotado: string;
  capacidadesExcepcionalesTalentoCientifico: string;
  capacidadesExcepcionalesTalentoTecnologico: string;
  capacidadesExcepcionalesTalentoSubjetivo: string;
}

export interface SituacionAcademica {
  situacionAcademicaNoEstudioVigenciaAnterior: string;
  situacionAcademicaAprobo: string;
  situacionAcademicaReprobo: string;
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
  direccionPadre: string;
  barrioPadre: string;
  numeroCelularPadre: string;
  ocupacionPadre: string;
  correoElectronicoPadre: string;

  //Madre
  tipoIdentificacionMadre: string;
  numeroIdentificacionMadre: string;
  primerNombreMadre: string;
  segundoNombreMadre: string;
  primerApellidoMadre: string;
  segundoApellidoMadre: string;
  direccionMadre: string;
  barrioMadre: string;
  numeroCelularMadre: string;
  ocupacionMadre: string;
  correoElectronicoMadre: string;
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

export interface AcudienteForm {
  tipoAcudiente: string;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  email: string;
  telefono: string;
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
  Authorization {
  acudientes?: AcudienteForm[];
}

