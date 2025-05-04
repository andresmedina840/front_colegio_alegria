// src/lib/validations/authSchemas.ts
import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string()
    .min(3, "Usuario debe tener al menos 3 caracteres")
    .max(30, "Usuario no puede exceder 30 caracteres"),
  password: z
    .string()
    .min(5, "Contraseña debe tener al menos 5 caracteres")
    .max(20, "Contraseña no puede exceder 20 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;