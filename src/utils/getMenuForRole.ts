// src/utils/getMenuForRole.ts
import { MENU_ITEMS } from "@/app/config/navigation";
import { UserRole } from "@/types";

export const getMenuForRole = (role: string) => {
  const upperRole = role.toUpperCase() as UserRole;
  return MENU_ITEMS.filter((item) => item.roles.includes(upperRole));
};
