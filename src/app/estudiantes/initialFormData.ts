const initialFormData = {
  fechaMatricula: "",

  //Segundo modulo
  tipoIdentificacionEstudianteId: "",
  numeroIdentificacionEstudiante: "",
  primerNombreEstudiante: "",
  segundoNombreEstudiante: "",
  primerApellidoEstudiante: "",
  segundoApellidoEstudiante: "",
  generoEstudianteId: "",
  fechaNacimiento: "",
  edad: "",
  paisNacimiento: "",
  departamentoNacimiento: "",
  municipioNacimiento: "",
  sedeMatricula: "",
  gradoId: "",
  pensionId: "",
  jornada: "",
  institucionEducativaAnterior: "",
  ultimoGradoCursado: "",
  ultimoAnioCursado: "",

  //Tercer modulo
  tipoSangre: "",
  epsAfiliado: "",
  ipsAsignada: "",
  arsAfiliado: "",
  nroCarnetSisben: "",
  nivelSisben: "",
  estrato: "",

  //Discapacidades
  noAplica: "",
  sorderaProfunda: "",
  hipoacusiaBajaVision: "",
  bajaVisionDiagnosticada: "",
  paralisisCerebral: "",
  autismo: "",
  deficienciaCognitiva: "",
  sindromeDown: "",
  multiple: "",

  //CapacidadesExcepcionales
  noAplicaCapacidad: "",
  superdotado: "",
  talentoCientifico: "",
  talentoTecnologico: "",
  talentoSubjetivo: "",

  //SituacionAcademica
  situacionAcademicaNoEstudioVigenciaAnterior: "",
  situacionAcademicaAprobo: "",
  situcionAcademicaReprobo: "",
  situacionAcademicaPendienteLogros: "",
  situacionAcademicaVieneOtraIE: "",
  situcionAcademicaIngresaPrimeraVezIE: "",
  situcionAcademicaNoCulminoEstudios: "",

  //Padre
  tipoIdentificacionPadre: "",
  numeroIdentificacionPadre: "",
  primerNombrePadre: "",
  segundoNombrePadre: "",
  primerApellidoPadre: "",
  segundoApellidoPadre: "",

  //Madre
  tipoIdentificacionMadre: "",
  numeroIdentificacionMadre: "",
  primerNombreMadre: "",
  segundoNombreMadre: "",
  primerApellidoMadre: "",
  segundoApellidoMadre: "",

  //DocumentacionRecibida
  documentacionRecibidaRegistroCivil: "",
  documentacionRecibidaCertificadosEstudios: "",
  documentacionRecibidaFotos: "",
  documentacionRecibidaCertificadoVinculado: "",
  documentacionRecibidaSistemaSocial: "",
  documentacionRecibidaEntidadAseguradora: "",
  documentacionRecibidaSeguroEstudiantil: "",
  documentacionRecibidaCertificadoEstratoSocioeconomico: "",
  documentacionRecibidaPagoSalvo: "",
  documentacionRecibidaRegistroVacunacion: "",
  documentacionRecibidaExamenSerologia: "",

  //Authorization
  autorizacionContactoEmergencia: "",
  autorizacionImagen: "",
  veracidadInformacion: "",

  //EmergencyContact
  primerNombreEmergencia: "",
  segundoNombreEmergencia: "",
  primerApellidoEmergencia: "",
  segundoApellidoEmergencia: "",
  telefonoEmergencia: "",
  parentescoEmergencia: "",

  acudientes: [],

};

export default initialFormData;

// ✅ Tipo basado en el objeto
export type FormDataType = typeof initialFormData;
