// src/hooks/useUserSession.ts
import { useQuery, UseQueryResult, UseQueryOptions } from "@tanstack/react-query";
import axiosClient from "@/axios/axiosClient";
import { useAuthStore, User } from "@/store/authStore";
import { AuthMeResponse, RawUser } from "@/types/typesApiLogueo";
import { UserRole } from "@/types";

const VALID_ROLES: UserRole[] = ["ADMIN", "PROFESOR", "PADRE"];

export const useUserSession = (): UseQueryResult<User, Error> => {
  const queryOptions: UseQueryOptions<User, Error, User> = {
    queryKey: ["user-session"],
    queryFn: async (): Promise<User> => {
      const response = await axiosClient.get<AuthMeResponse>("/auth/me");
      const raw: RawUser = response.data.data;

      const token = useAuthStore.getState().token ?? "";

      const [firstName, ...rest] = raw.nombreCompleto?.trim().split(" ") ?? [];
      const lastName = rest.join(" ") || "";

      if (!VALID_ROLES.includes(raw.rol)) {
        throw new Error(`Rol inválido recibido del backend: ${raw.rol}`);
      }

      const user: User = {
        id: raw.id,
        username: raw.username,
        firstName,
        lastName,
        email: "",
        role: raw.rol,
        token,
      };

      useAuthStore.getState().login(user);
      return user;
    },
    retry: false,
    staleTime: 1000 * 60 * 5,
  };

  return useQuery<User, Error, User>(queryOptions);
};
