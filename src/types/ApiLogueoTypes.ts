// src/types/ApiLogueoTypes.ts
export interface RawUser {
  id: number;
  username: string;
  nombreCompleto: string;
  rol: string; // Mantenemos string para flexibilidad en la respuesta
  email?: string;
}

export interface AuthMeResponse {
  code: number;
  message: string;
  data: RawUser;
}

export interface ApiSoloResponseDTO {
  code: number;
  message: string;
}

export interface ApiResponseDTO<T> {
  code: number;
  message: string;
  data: T;
}
