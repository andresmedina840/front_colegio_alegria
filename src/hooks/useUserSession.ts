// src/hooks/useUserSession.ts
import { useQuery, UseQueryResult, UseQueryOptions } from "@tanstack/react-query";
import axiosClient from "@/axios/axiosClient";
import { useAuthStore, User } from "@/store/authStore";

export const useUserSession = (): UseQueryResult<User, Error> => {
  const queryOptions: UseQueryOptions<User, Error, User> = {
    queryKey: ["user-session"],
    queryFn: async (): Promise<User> => {
      const response = await axiosClient.get<User>("/auth/me");
      const user = response.data;
      useAuthStore.getState().login(user);
      return user;
    },
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutos
  };

  return useQuery<User, Error, User>(queryOptions);
};