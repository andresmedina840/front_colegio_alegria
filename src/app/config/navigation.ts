// src/app/config/navigation.ts
import { MenuItem } from "@/types";

export const MENU_ITEMS: MenuItem[] = [
  { 
    text: "Dashboard", 
    route: "/dashboard", 
    roles: ["ADMIN", "PROFESOR", "PADRE"],
    icon: "Dashboard" 
  },
  { 
    text: "Estudiantes", 
    route: "/estudiantes", 
    roles: ["ADMIN", "PROFESOR"],
    icon: "People" 
  },
  { 
    text: "Boletines", 
    route: "/boletines", 
    roles: ["ADMIN", "PROFESOR"],
    icon: "Assignment" 
  },
  { 
    text: "Materias", 
    route: "/materias", 
    roles: ["ADMIN"],
    icon: "Book" 
  },
  { 
    text: "Profesores", 
    route: "/profesores", 
    roles: ["ADMIN"],
    icon: "School" 
  },
  { 
    text: "Buscar Estudiantes", 
    route: "/buscar-estudiantes", 
    roles: ["ADMIN", "PROFESOR"],
    icon: "Search" 
  }
];