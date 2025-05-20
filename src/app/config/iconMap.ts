import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Book as BookIcon,
  School as SchoolIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { SvgIconComponent } from "@mui/icons-material";

/**
 * Claves válidas para íconos en el sistema de navegación
 */
export type IconName =
  | "Dashboard"
  | "People"
  | "Assignment"
  | "Book"
  | "School"
  | "Search";

/**
 * Mapa de nombres de iconos a componentes (sin renderizar)
 */
export const ICON_COMPONENTS: Record<IconName, SvgIconComponent> = {
  Dashboard: DashboardIcon,
  People: PeopleIcon,
  Assignment: AssignmentIcon,
  Book: BookIcon,
  School: SchoolIcon,
  Search: SearchIcon,
};
