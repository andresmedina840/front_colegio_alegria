// src/estudiantes/initialDataRegistroEstudiantes.ts
import { StudentInfoFormValues } from "@/schemas/studentInfoSchema";

export const initialDataRegistroEstudiantes: StudentInfoFormValues = {
  
  // 1. Información de matrícula
  numeroMatricula: "", 
  fechaMatricula: "22/05/2025",

  // 2. Información del estudiante
  tipoIdentificacionEstudianteId: "",
  numeroIdentificacionEstudiante: "",
  primerNombreEstudiante: "",
  segundoNombreEstudiante: "",
  primerApellidoEstudiante: "",
  segundoApellidoEstudiante: "",
  generoEstudianteId: "",
  fechaNacimiento: "01/01/2010",
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

  // 3. Afiliación de salud
  tipoSangre: "",
  epsAfiliado: "",
  ipsAsignada: "",
  arsAfiliado: "",
  nroCarnetSisben: "",
  nivelSisben: "",
  estrato: "",

  // 4. Discapacidades
  discapacidadesNoAplica: "NO",
  discapacidadesSorderaProfunda: "NO",
  discapacidadesHipoacusiaBajaVision: "NO",
  discapacidadesBajaVisionDiagnosticada: "NO",
  discapacidadesParalisisCerebral: "NO",
  discapacidadesAutismo: "NO",
  discapacidadesDeficienciaCognitiva: "NO",
  discapacidadesSindromeDown: "NO",
  discapacidadesMultiple: "NO",

  // 5. Capacidades excepcionales
  capacidadesExcepcionalesNoAplica: "NO",
  capacidadesExcepcionalesSuperdotado: "NO",
  capacidadesExcepcionalesTalentoCientifico: "NO",
  capacidadesExcepcionalesTalentoTecnologico: "NO",
  capacidadesExcepcionalesTalentoSubjetivo: "NO",

  // 6. Situación académica
  situacionAcademicaNoEstudioVigenciaAnterior: "NO",
  situacionAcademicaAprobo: "NO",
  situacionAcademicaReprobo: "NO",
  situacionAcademicaPendienteLogros: "NO",
  situacionAcademicaVieneOtraIE: "NO",
  situacionAcademicaIngresaPrimeraVezIE: "NO",
  situacionAcademicaNoCulminoEstudios: "NO",

  // 7. Información de padres
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

  // 8. Documentación recibida
  documentacionRecibidaRegistroCivil: "NO",
  documentacionRecibidaCertificadosEstudios: "NO",
  documentacionRecibidaFotos: "NO",
  documentacionRecibidaCertificadoVinculado: "NO",
  documentacionRecibidaSistemaSocial: "NO",
  documentacionRecibidaEntidadAseguradora: "NO",
  documentacionRecibidaSeguroEstudiantil: "NO",
  documentacionRecibidaCertificadoEstratoSocioeconomico: "NO",
  documentacionRecibidaPagoSalvo: "NO",
  documentacionRecibidaRegistroVacunacion: "NO",
  documentacionRecibidaExamenSerologia: "NO",

  // 9. Autorizaciones
  autorizacionContactoEmergencia: "NO",
  autorizacionImagen: "NO",
  veracidadInformacion: "NO",

  // 10. Contacto de emergencia
  primerNombreEmergencia: "",
  segundoNombreEmergencia: "",
  primerApellidoEmergencia: "",
  segundoApellidoEmergencia: "",
  telefonoEmergencia: "",
  parentescoEmergencia: "",

  // 11. Acudientes
  acudientes: [],
};
