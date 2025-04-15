import type { NextConfig } from "next";
import dotenv from "dotenv";
import path from "path";

// Cargar variables de entorno según el entorno de ejecución
dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env.development",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Configuración para el despliegue en Docker
  output: 'standalone',

  // Configura el directorio de salida (opcional)
  distDir: process.env.NODE_ENV === 'production' ? '.next' : '.next-dev',

  env: {
    NEXT_PUBLIC_BACKEND: process.env.NEXT_PUBLIC_BACKEND,
  },

  // Configuración experimental actualizada para Next.js 15
  experimental: {
    // Puedes agregar otras opciones experimentales aquí
  },

  // Configuración para el tracing de archivos (moderna)
  outputFileTracing: true
};

export default nextConfig;
