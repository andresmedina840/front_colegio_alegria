// src/store/authStore.ts
import { UserRole } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email?: string;
  role: UserRole;
  token: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (userData: User) => void;
  logout: () => void;
  loadFromStorage: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      login: (userData: User) => {
        if (!userData || !userData.token || !userData.role) {
          console.error("[AuthStore] Datos inválidos en login:", userData);
          return;
        }
        set({ user: userData, token: userData.token });
      },
      logout: () => {
        set({ user: null, token: null });
      },
      loadFromStorage: () => {
        try {
          const stored = localStorage.getItem("auth-storage");
          if (!stored) return;

          const parsed = JSON.parse(stored)?.state as AuthState;
          if (parsed?.user && parsed?.token) {
            set({ user: parsed.user, token: parsed.token });
          }
        } catch (err) {
          console.error("[AuthStore] Error cargando auth desde storage:", err);
        }
      },
      isAuthenticated: () => {
        const { user, token } = get();
        return !!user && !!token;
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);
