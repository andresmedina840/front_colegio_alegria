import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import { MenuItem } from "./types";

export const MENU_ITEMS: MenuItem[] = [
  {
    label: "Inicio",
    icon: DashboardIcon,
    route: "/",
    roles: ["ADMIN", "DOCENTE", "ESTUDIANTE"],
  },
  {
    label: "Estudiantes",
    icon: SchoolIcon,
    route: "/estudiantes",
    roles: ["ADMIN", "DOCENTE"],
  },
];
