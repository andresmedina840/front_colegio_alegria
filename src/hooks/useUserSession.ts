"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { fetchUserSession } from "@/hooks/fetchUserSession";
import { useAuthStore, type User } from "@/store/authStore";
import React from "react";

export const useUserSession = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const logout = useAuthStore.getState().logout;
  const queryClient = useQueryClient();

  const query = useQuery<User, Error>({
    queryKey: ["user-session"],
    queryFn: fetchUserSession,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  React.useEffect(() => {
    if (query.isError) {
      const message = query.error?.message || "Error de sesión";
      enqueueSnackbar(message, { variant: "error" });
      
      // Limpiar cache y hacer logout
      queryClient.removeQueries({ queryKey: ["user-session"] });
      logout();
      router.push("/login?sessionExpired=true");
    }
  }, [query.isError, query.error, enqueueSnackbar, logout, router, queryClient]);

  return query;
};