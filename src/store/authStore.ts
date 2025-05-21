// ✅ src/store/authStore.ts
import { User } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie";

interface AuthState {
  user: User | null;
  token: string | null;
  login: (userData: Omit<User, "token">) => void;
  logout: () => void;
  loadFromStorage: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      login: (userData) => {
        const token = Cookies.get("access_token") ?? "";

        if (!token || !userData.rol) {
          console.error("[AuthStore] Datos inválidos:", userData);
          return;
        }

        set({
          user: { ...userData, token },
          token,
        });
      },
      logout: () => set({ user: null, token: null }),
      loadFromStorage: () => {
        try {
          const stored = localStorage.getItem("auth-storage");
          if (stored) {
            const { user, token } = JSON.parse(stored).state as AuthState;
            if (user && token) set({ user, token });
          }
        } catch (error) {
          console.error("[AuthStore] Error al cargar:", error);
        }
      },
      isAuthenticated: () => !!get().user && !!get().token,
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, token: state.token }),
    }
  )
);