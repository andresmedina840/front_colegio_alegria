'use client';

import { SnackbarProvider } from 'notistack';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <SnackbarProvider
          maxSnack={3} // Número máximo de notificaciones visibles simultáneamente
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          autoHideDuration={4000} // Duración de las notificaciones en milisegundos
        >
          {children}
        </SnackbarProvider>
      </body>
    </html>
  );
}
