const initialFormData = {
  fechaMatricula: "",

  //Información del estudiante
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

  //Afiliación al sistema de salud
  tipoSangre: "",
  epsAfiliado: "",
  ipsAsignada: "",
  arsAfiliado: "",
  nroCarnetSisben: "",
  nivelSisben: "",
  estrato: "",

  //Discapacidades
  discapacidadesNoAplica: "",
  discapacidadesSorderaProfunda: "",
  discapacidadesHipoacusiaBajaVision: "",
  discapacidadesBajaVisionDiagnosticada: "",
  discapacidadesParalisisCerebral: "",
  discapacidadesAutismo: "",
  discapacidadesDeficienciaCognitiva: "",
  discapacidadesSindromeDown: "",
  discapacidadesMultiple: "",

  //CapacidadesExcepcionales
  capacidadesExcepcionalesNoAplica: "",
  capacidadesExcepcionalesSuperdotado: "",
  capacidadesExcepcionalesTalentoCientifico: "",
  capacidadesExcepcionalesTalentoTecnologico: "",
  capacidadesExcepcionalesTalentoSubjetivo: "",

  //SituacionAcademica
  situacionAcademicaNoEstudioVigenciaAnterior: "",
  situacionAcademicaAprobo: "",
  situacionAcademicaReprobo: "",
  situacionAcademicaPendienteLogros: "",
  situacionAcademicaVieneOtraIE: "",
  situacionAcademicaIngresaPrimeraVezIE: "",
  situacionAcademicaNoCulminoEstudios: "",

  //Padre
  tipoIdentificacionPadre: "",
  numeroIdentificacionPadre: "",
  primerNombrePadre: "",
  segundoNombrePadre: "",
  primerApellidoPadre: "",
  segundoApellidoPadre: "",
  direccionPadre: "",
  barrioPadre: "",
  numeroCelularPadre: "",
  ocupacionPadre: "",
  correoElectronicoPadre: "",

  //Madre
  tipoIdentificacionMadre: "",
  numeroIdentificacionMadre: "",
  primerNombreMadre: "",
  segundoNombreMadre: "",
  primerApellidoMadre: "",
  segundoApellidoMadre: "",
  direccionMadre: "",
  barrioMadre: "",
  numeroCelularMadre: "",
  ocupacionMadre: "",
  correoElectronicoMadre: "",

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
