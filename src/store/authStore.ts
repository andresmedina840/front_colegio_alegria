import { User } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthState {
  user: User | null;
  token: string | null; // Añadimos el token aquí
  isLoading: boolean;
  error: string | null;
  hasHydrated: boolean;
  login: (userData: User, token: string) => Promise<void>; // Añadimos token como parámetro
  logout: () => void;
  hydrate: () => Promise<void>; // Cambiamos el nombre de loadFromStorage a hydrate
  isAuthenticated: () => boolean;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null, // Inicializamos el token
      isLoading: false,
      error: null,
      hasHydrated: false,

      login: async (userData, token) => {
        // Añadimos token como parámetro
        set({ isLoading: true, error: null });
        try {
          if (!userData?.rol) {
            throw new Error("Rol no definido en los datos del usuario");
          }

          set({
            user: userData,
            token: token, // Guardamos el token
            isLoading: false,
            hasHydrated: true,
          });

          console.log("[AuthStore] Login exitoso", {
            user: userData.username,
            rol: userData.rol,
          });
        } catch (error) {
          console.error("[AuthStore] Error en login:", error);
          set({
            error: error instanceof Error ? error.message : "Error desconocido",
            isLoading: false,
          });
        }
      },

      logout: () => {
        set({
          user: null,
          token: null, // Limpiamos el token
          error: null,
          hasHydrated: true,
        });
        console.log("[AuthStore] Logout exitoso");
      },

      hydrate: async () => {
        if (get().hasHydrated || get().isLoading) {
          return;
        }

        set({ isLoading: true });

        try {
          const stored = localStorage.getItem("auth-storage");
          if (stored) {
            const parsed = JSON.parse(stored);
            const { user, token } = parsed.state as AuthState;

            if (user && token) {
              set({
                user,
                token,
                hasHydrated: true,
              });
              console.log("[AuthStore] Sesión cargada desde storage", {
                user: user.username,
              });
            }
          }
        } catch (error) {
          console.error("[AuthStore] Error al cargar desde storage:", error);
          set({ error: "Error al cargar sesión guardada" });
        } finally {
          set({
            isLoading: false,
            hasHydrated: true,
          });
        }
      },

      isAuthenticated: () => !!get().user && !!get().token, // Verificamos también el token

      clearError: () => set({ error: null }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token, // Persistimos el token
        hasHydrated: state.hasHydrated,
      }),
      version: 1,
      migrate: (persistedState: unknown, version: number) => {
        console.log(`Migrando authStore de versión ${version} a versión 1`);

        if (!persistedState) {
          return {
            user: null,
            token: null,
            isLoading: false,
            error: null,
            hasHydrated: false,
          };
        }

        if (version === 0) {
          const oldState = persistedState as { state: { user: User | null } };
          return {
            ...oldState,
            state: {
              ...oldState.state,
              token: null,
              isLoading: false,
              error: null,
              hasHydrated: false,
            },
          };
        }

        return persistedState as AuthState;
      },
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hasHydrated = true;
        }
      },
    }
  )
);

export const checkAuth = async (): Promise<{
  isAuthenticated: boolean;
  user: User | null;
}> => {
  const state = useAuthStore.getState();

  if (state.isAuthenticated()) {
    return { isAuthenticated: true, user: state.user };
  }

  if (!state.hasHydrated) {
    await state.hydrate();
  }

  const newState = useAuthStore.getState();
  return {
    isAuthenticated: newState.isAuthenticated(),
    user: newState.user,
  };
};
