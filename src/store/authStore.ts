// src/store/authStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
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
      login: (userData) => {
        set({ user: userData, token: userData.token });
      },
      logout: () => {
        set({ user: null, token: null });
      },
      loadFromStorage: () => {
        const data = localStorage.getItem('auth-storage');
        if (data) {
          try {
            const parsed = JSON.parse(data).state as AuthState;
            if (parsed?.user && parsed?.token) {
              set({
                user: parsed.user,
                token: parsed.token,
              });
            }
          } catch (error) {
            console.error('Error al cargar datos de auth-storage:', error);
          }
        }
      },
      isAuthenticated: () => {
        const { user, token } = get();
        return !!user && !!token;
      }
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

