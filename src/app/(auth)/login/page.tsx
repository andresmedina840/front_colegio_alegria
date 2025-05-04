// src/app/(auth)/login/page.tsx
'use client';

import { useEffect, useState } from 'react';
import LoginForm from '../../../components/Login/LoginForm';
import { Box } from '@mui/material';

export default function LoginPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // O un loader/skeleton
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <LoginForm />
    </Box>
  );
}