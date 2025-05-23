"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import api from "../axios/axiosClient";

interface User {
  id: string;
  username: string;
  rol: string;
  primerNombre?: string;
  primerApellido?: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  loading: true,
  isAuthenticated: false,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({
  children,
}: AuthProviderProps): React.ReactElement => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const userData = sessionStorage.getItem("userData");

        if (userData) {
          const parsedData = JSON.parse(userData);
          setUser(parsedData);
        }
      } catch {
        sessionStorage.removeItem("userData");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Dentro de la función login en AuthContext.tsx
  // En la función login de AuthContext.tsx
const login = useCallback(async (credentials: { username: string; password: string }) => {
  try {
    setLoading(true);
    const response = await api.post('/auth/login', credentials);
    
    const userData = {
      id: response.data.id,
      username: response.data.username,
      rol: response.data.rol,
      primerNombre: response.data.primerNombre,
      primerApellido: response.data.primerApellido,
      email: response.data.email,
    };

    // Depuración: verifica los datos antes de guardar
    console.log("Datos recibidos del login:", response.data);
    
    sessionStorage.setItem('userData', JSON.stringify({
      ...userData,
      token: response.data.token
    }));

    // Verifica inmediatamente después de guardar
    const storedData = sessionStorage.getItem('userData');
    console.log("Datos almacenados:", storedData ? JSON.parse(storedData) : null);

    setUser(userData);
    enqueueSnackbar(response.data.message || 'Inicio de sesión exitoso', { variant: 'success' });

    if (userData.rol === 'ADMIN') {
      router.push('/dashboard/admin');
    } else {
      router.push('/dashboard');
    }
  } catch  {
    // ... [manejo de errores] ...
  } finally {
    setLoading(false);
  }
}, [enqueueSnackbar, router]);

  const logout = useCallback(() => {
    sessionStorage.removeItem("userData");
    setUser(null);
    router.push("/login");
    enqueueSnackbar("Sesión cerrada correctamente", { variant: "success" });
  }, [enqueueSnackbar, router]);

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
