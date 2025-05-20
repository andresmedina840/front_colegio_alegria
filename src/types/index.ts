// src/types/index.ts
export type UserRole = "ADMIN" | "PROFESOR" | "PADRE";

export type IconName = "Dashboard" | "People" | "Assignment" | "Book" | "School" | "Search";

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