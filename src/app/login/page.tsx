'use client';

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
      <LoginForm />
    </main>
  );
}
