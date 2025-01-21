import LoginForm from '../components/LoginForm';
import CreateUserForm from '../components/CreateUserForm';

export default function Home() {
  return (
    <main
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '2rem',
        height: '100vh',
        backgroundColor: '#f5f5f5',
      }}
    >
      <LoginForm />
      <CreateUserForm />
    </main>
  );
}
