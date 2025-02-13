"use client";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack";
import theme from "./theme/theme";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider maxSnack={3}>
            {/* Contenedor global para suppressHydrationWarning */}
            <div suppressHydrationWarning>
              {children}
            </div>
          </SnackbarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}