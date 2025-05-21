// ✅ src/types/index.ts
export type UserRole = "ADMIN" | "PROFESOR" | "PADRE";

export type IconName =
  | "Dashboard"
  | "People"
  | "Assignment"
  | "Book"
  | "School"
  | "Search";

/**
 * Estructura completa del usuario en el sistema
 */
export interface User {
  id: number;
  username: string;
  nombreCompleto: string;
  email?: string;
  rol: UserRole;
  token?: string;
}

/**
 * Respuesta de la API para endpoints de autenticación
 */
export interface AuthResponse {
  code: number;
  message: string;
  data: {
    id: number;
    username: string;
    nombreCompleto: string;
    rol: string; // El backend puede enviarlo en minúsculas
    email?: string;
  };
}

export interface GradoAcademico {
  id: number;
  nombre: string;
  capacidad: number;
}

export interface RendimientoMateria {
  materia: string;
  calificacion: number;
  inasistencias: number;
}

export interface BoletinEstudiante {
  id: number;
  estudiante: string;
  grado: string;
  materias: RendimientoMateria[];
}

export interface OpcionMenu {
  texto: string;
  ruta: string;
  rolesPermitidos: UserRole[];
}

export interface UsuarioAutenticado {
  token: string;
  rol: UserRole;
  nombre: string;
}

export interface EstadoCarga {
  cargando: boolean;
  mensajeError: string;
}

export interface MenuItem {
  text: string;
  route: string;
  roles: UserRole[];
  icon: IconName;
}
