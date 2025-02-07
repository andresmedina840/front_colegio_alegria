import type { NextConfig } from "next";
import dotenv from "dotenv";
import path from "path";

// Cargar variables de entorno según el entorno de ejecución
dotenv.config({
  path: process.env.NODE_ENV === "production" ? ".env.production" : ".env.development",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BACKEND: process.env.NEXT_PUBLIC_BACKEND,
  },
};

export default nextConfig;
