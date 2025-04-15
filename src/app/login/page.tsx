'use client';

import { Suspense } from 'react';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  return (
    <main
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '1rem',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Suspense fallback={<div>Cargando login...</div>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
