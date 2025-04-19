// src/app/types/emergencyContactTypes.ts
import { InferType } from "yup";
import { emergencyContactSchema } from "../schemas/emergencyContactSchema";

export type EmergencyContactFormValues = InferType<typeof emergencyContactSchema>;
