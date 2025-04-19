'use client';

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/es';
import theme from "./theme/theme";
import { useEffect, useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <html lang="es">
        <body>
          {/* Placeholder durante la hidratación */}
          <div style={{ visibility: 'hidden' }}>
            {children}
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="es">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider 
            maxSnack={3}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
          >
            <LocalizationProvider 
              dateAdapter={AdapterDayjs} 
              adapterLocale="es"
            >
              {children}
            </LocalizationProvider>
          </SnackbarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}