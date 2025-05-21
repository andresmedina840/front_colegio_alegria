// ✅ src/hooks/fetchUserSession.ts
import { AuthResponse, User, UserRole } from "@/types";
import axiosClient from "@/axios/axiosClient";
import { useAuthStore } from "@/store/authStore";

export const fetchUserSession = async (): Promise<User> => {
  const res = await axiosClient.get<AuthResponse>("/auth/me", {
    withCredentials: true,
  });

  const raw = res.data.data;
  const token = useAuthStore.getState().token ?? "";

  const role = raw.rol.toUpperCase() as UserRole;
  const VALID_ROLES: UserRole[] = ["ADMIN", "PROFESOR", "PADRE"];
  if (!VALID_ROLES.includes(role)) {
    throw new Error(`Rol inválido: ${raw.rol}`);
  }

  return {
    id: raw.id,
    username: raw.username,
    nombreCompleto: raw.nombreCompleto,
    email: raw.email ?? "",
    rol: role,
    token,
  };
};
