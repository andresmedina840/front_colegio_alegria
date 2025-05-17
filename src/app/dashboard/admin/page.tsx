'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function AdminDashboard() {
  const router = useRouter();
  const { isAuthenticated, user, loadFromStorage } = useAuthStore();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const restoreAndCheck = () => {
      loadFromStorage();
      setTimeout(() => {
        if (!isAuthenticated()) {
          router.replace('/login');
        } else if (user?.role !== 'ADMIN') {
          router.replace('/');
        } else {
          setChecking(false);
        }
      }, 100);
    };
    restoreAndCheck();
  }, [isAuthenticated, user, router, loadFromStorage]);

  if (checking) return <div>Cargando...</div>;

  return <div>Bienvenido al panel de administración</div>;
}