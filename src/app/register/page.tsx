'use client';

import CreateUserForm from '../components/CreateUserForm';

export default function RegisterPage() {
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
      <h1>Regístrate</h1>
      <CreateUserForm />
    </main>
  );
}
