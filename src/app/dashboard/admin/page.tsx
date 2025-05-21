'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function AdminDashboard() {
  const router = useRouter();
  const { isAuthenticated, user, hydrate } = useAuthStore(); // Cambiamos loadFromStorage a hydrate
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const restoreAndCheck = async () => { // Hacemos la función async
      await hydrate(); // Usamos hydrate y esperamos a que complete
      if (!isAuthenticated()) {
        router.replace('/login');
      } else if (user?.rol !== 'ADMIN') {
        router.replace('/');
      } else {
        setChecking(false);
      }
    };
    restoreAndCheck();
  }, [isAuthenticated, user, router, hydrate]);

  if (checking) return <div>Cargando...</div>;

  return <div>Bienvenido al panel de administración</div>;
}