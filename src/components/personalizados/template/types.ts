// ./src/components/personalizados/template/types.ts
import { SvgIconComponent } from "@mui/icons-material";

export interface MenuItem {
  label: string;
  icon: SvgIconComponent;
  route: string;
  roles: string[];
}

