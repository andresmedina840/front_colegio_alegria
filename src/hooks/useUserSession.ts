// ✅ src/hooks/useUserSession.ts
"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useRouter } from "next/navigation";
import { fetchUserSession } from "@/hooks/fetchUserSession";
import { useAuthStore } from "@/store/authStore";
import React from "react";
import { User } from "@/types";

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

      queryClient.removeQueries({ queryKey: ["user-session"] });
      logout();
      router.push("/login?sessionExpired=true");
    }
  }, [query.isError, query.error]);

  return query;
};