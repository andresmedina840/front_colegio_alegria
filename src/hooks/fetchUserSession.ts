// src/hooks/fetchUserSession.ts
import { User } from "@/store/authStore";
import { AuthMeResponse } from "@/types/ApiLogueoTypes";
import { UserRole } from "@/types";
import axiosClient from "@/axios/axiosClient";
import { useAuthStore } from "@/store/authStore";

export const fetchUserSession = async (): Promise<User> => {
  const response = await axiosClient.get<AuthMeResponse>("/auth/me");
  const raw = response.data.data;

  const [firstName, ...rest] = raw.nombreCompleto.trim().split(" ");
  const lastName = rest.join(" ");
  const token = useAuthStore.getState().token ?? "";

  const role = raw.rol.toUpperCase() as UserRole;
  const VALID_ROLES: UserRole[] = ["ADMIN", "PROFESOR", "PADRE"];

  if (!VALID_ROLES.includes(role)) {
    throw new Error(`Rol inválido: ${raw.rol}`);
  }

  const user: User = {
    id: raw.id,
    username: raw.username,
    firstName,
    lastName,
    email: "",
    role,
    token,
  };

  useAuthStore.getState().login(user);
  return user;
};
