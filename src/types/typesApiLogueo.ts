// src/types/typesApiLogueo.ts
import { UserRole } from "./index"; 

/**
 * Estructura esperada del usuario desde /auth/me
 */
export interface RawUser {
  id: number;
  username: string;
  nombreCompleto: string;
  rol: UserRole;
}

/**
 * Respuesta del endpoint /auth/me
 */
export interface AuthMeResponse {
  data: RawUser;
}

/**
 * Estructura genérica para respuestas de solo mensaje
 */
export interface ApiSoloResponseDTO {
  code: number;
  message: string;
}

/**
 * Estructura genérica para respuestas con data
 */
export interface ApiResponseDTO<T> {
  code: number;
  message: string;
  data: T;
}
