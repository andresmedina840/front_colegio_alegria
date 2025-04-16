// src/app/types/formTypes.ts
export interface FormDataType {
  numeroMatricula: string;
  fechaMatricula: string;
  tipoIdentificacionEstudianteId: string;
  numeroIdentificacionEstudiante: string;
  primerNombreEstudiante: string;
  segundoNombreEstudiante: string;
  primerApellidoEstudiante: string;
  segundoApellidoEstudiante: string;
  sedeMatricula: string;
  gradoId: string;
  pensionId: string;
  jornada: string;
  institucionEducativaAnterior: string;
  ultimoGradoCursado: string;
  ultimoAnioCursado: string;
  generoEstudianteId: string;
  fechaNacimiento: string;
  edad: string;
  paisNacimiento: string;
  departamentoNacimiento: string;
  municipioNacimiento: string;
  tipoSangre: string;
  epsAfiliado: string;
  ipsAsignada: string;
  arsAfiliado: string;
  nroCarnetSisben: string;
  nivelSisben: string;
  estrato: string;
  numeroIdentificacionPadre: string;
  primerNombrePadre: string;
  segundoNombrePadre: string;
  primerApellidoPadre: string;
  segundoApellidoPadre: string;
  primerNombreMadre: string;
  segundoNombreMadre: string;
  primerApellidoMadre: string;
  segundoApellidoMadre: string;
  numeroIdentificacionMadre: string;
  autorizacionImagen: string;
  veracidadInformacion: string;
  autorizacionCoctactoEmergencia: string;
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

export type FormField = keyof FormDataType;